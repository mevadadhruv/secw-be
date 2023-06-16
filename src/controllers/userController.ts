import userModel from "../models/user.model";
import express from "express";

export default class UserController {
    createUser(req: express.Request, res: express.Response) {
        try {
            const emailId = req.body.emailId;
            const password = req.body.password;
            userModel.create({
                emailId,
                password
            }).then((result) => {
                return res.status(400).json({ message: 'created successfully' });
            }).catch((err) => {
                console.log("within try : ", err);
            });
        }
        catch (err) {
            return res.json({ err });
        }
    }

    getUser(req: express.Request, res: express.Response) {
        try {
            userModel.find().then((result) => {
                return res.json({ result });
            }).catch((err) => {
                console.log('within try : ', err)
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async getUserbyId(req: express.Request, res: express.Response) {
        try {
            const userFind = await userModel.findById(req.params.id);
            if(!userFind){
                res.json({message : "no user associated with id"});
            }
            console.log('find:- ', userFind);
            return res.json({userFind});
        }
        catch (err) {
            console.log(err);
        }
    }

    updateUser(req: express.Request, res: express.Response) {
       try{
            const updateUser = userModel.findByIdAndUpdate(req.params.id,
                req.body.emailId,
                req.body.password
            );
            if(!updateUser){
                return res.json({message : "no user associated with id"});
            }
            console.log(updateUser);
            return res.json({message : "updated successfully"});
       }
       catch(err){
            console.log(err);
       }
    }

    deleteUser(req: express.Request, res: express.Response) {//soft-delete
        try{
            const userId = userModel.findById(req.params.id);
            //console.log(userId);
            if(!userId){
                res.json({message : "user not existed"});
            }
            const deleteUser = userId.deleteOne();
            //console.log(deleteUser);
            return res.json({message : "user deleted sucessfully"});
        }
        catch(err){
            console.log(err);
        }
    }
}