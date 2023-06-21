import express from "express";
import { inject, injectable } from "inversify";
import { CreateUser, UpdateUser } from "../types/userTypes";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
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
           return res.status(200).json({message : "User Created Successfully!"});
        }
        catch (err) {
            return res.json({ err });
        }
    }

    async getUser(req: express.Request, res: express.Response) {
        try {
            const users = await this.UserService.getUser();
            if(users){
                return res.status(200).json({users});
            }
        }
        catch (err) {
            return res.json({ err });
        }
    }

    async getUserbyId(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            const user = await this.UserService.getUserbyId(userId);
            return res.status(200).json({user});
        }
        catch (err) {
            return res.json({err});
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
                return res.status(400).json({message : "no such user existed"});
            }
            if(updateUser){
                const updatedUser = await this.UserService.getUserbyId(userId);
                return res.status(200).json({message : "user updated successfully!!" , updateUser});
            }
        }
       catch(err){
            return res.json({err});
       }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        try{
            const userId = req.params.id;
            const deleteUser = await this.UserService.deleteUser(userId);
            return res.status(200).json({message : "user deleted successfully"});
        }
        catch(err){
            return res.json({err});
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
            return res.json({err});
        }
    }
}