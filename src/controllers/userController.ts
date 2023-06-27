import express from "express";
import { inject, injectable } from "inversify";
import { CreateUser, UpdateUser } from "../types/userTypes";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import AppError from "../Error/AppError";
import {sendErrorProd} from "../Error/globalErrorHandler";
const message =  require("../Error/globalSuccessHandler");

@injectable()   
export default class UserController {
    private UserService : IUserService;

    constructor(@inject(types.IUserService) userService:IUserService){
        this.UserService = userService;
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            const user : CreateUser = {
                emailId:req.body.emailId,
                password:req.body.password
            };
           const service = await this.UserService.createUser(user);
           return message.sendResponse(200,"user created successfully",service,res);
        }
        catch (err) {
            return sendErrorProd(err,req,res);
        }
    }

    async getUser(req: express.Request, res: express.Response) {
        try {
            const users = await this.UserService.getUser();
            if(users){
                return message.sendResponseGet(200,users,res);
            }
        }
        catch (err) {
            return sendErrorProd(err,req,res);
        }
    }

    async getUserbyId(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            const user = await this.UserService.getUserbyId(userId);
            return message.sendResponseGet(200,user,res);
        }
        catch (err) {
            return sendErrorProd(err,req,res);
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
       try{
            const userId = req.params.id;
            const User : UpdateUser = {
                emailId : req.body.emailId,
                password : req.body.password
            };
            const updateUser = await this.UserService.updateUser(userId,User);
            if(!updateUser){
                return new AppError("no such user existed",400);
            }
            if(updateUser){
                const updatedUser = await this.UserService.getUserbyId(userId);
                return message.sendResponse(200,"User updated successfully",updatedUser,res);
            }
        }
       catch(err){
            return sendErrorProd(err,req,res);
       }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        try{
            const userId = req.params.id;
            const deleteUser = await this.UserService.deleteUser(userId);
            return message.sendResponseDelete(200,"user deleted successfully!",res);
        }
        catch(err){
            return sendErrorProd(err,req,res);
        }
    }

    async LoginUser(req:express.Request, res:express.Response){
        try{
            const user : CreateUser = {
                emailId:req.body.emailId,
                password:req.body.password
            };
            if(!(user.emailId && user.password)){
                return res.status(400).json({message : "field can`t be empty"});
            }
            const userCheck = await this.UserService.LoginUser(user);
            console.log(userCheck);
            if(!userCheck){
                return res.status(400).json({message : "invalid creditionals"});
            }
            else{
                return res.status(200).json({message : "login successfully!"});
            }
        }
        catch(err){
            return sendErrorProd(err,req,res);
        }
    }
}