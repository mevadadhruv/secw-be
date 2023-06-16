import userModel from "../models/user.model";
import express from "express";
import UserService from "../services/userService";
const userService = new UserService()
export default class UserController {

    async createUser(req: express.Request, res: express.Response) {
        try {
           const service = await userService.createUser(req.body);
           return res.status(200).json({message : "User Created Successfully!"});
        }
        catch (err) {
            return res.json({ err });
        }
    }

    async getUser(req: express.Request, res: express.Response) {
        try {
            const users = await userService.getUser();
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
            const user = await userService.getUserbyId(userId);
            return res.status(200).json({user});
        }
        catch (err) {
            return res.json({err});
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
       try{
            const userId = req.params.id;
            const updateUser = await userService.updateUser(userId,req.body);
            return res.status(200).json({message : "user updated successfully!!" , updateUser});
        }
       catch(err){
            return res.json({err});
       }
    }

    async deleteUser(req: express.Request, res: express.Response) {//soft-delete
        try{
            const userId = req.params.id;
            const deleteUser = await userService.deleteUser(userId);
            return res.status(200).json({message : "user deleted successfully"});
        }
        catch(err){
            return res.json({err});
        }
    }
}