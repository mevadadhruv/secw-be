import userModel from "../models/user.model";
import { CreateUser,UpdateUser,GetUser } from "../types/userTypes";
import bcrypt from "bcrypt";

export default class UserRepository {
    async createUser(user:CreateUser) {
        try{
            const emailId = user.emailId;
            const password = user.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password.toString(),salt);
            const res = await userModel.create(
            { emailId, password : hashPassword }
            );
            return res;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }

    async getUser(){
        try{
            const res = await userModel.find();
            return res;
        }
        catch(err){
            console.log('inside repository',err);
        } 
    }

    async getUserbyId(id:String){
        try{
            const res = await userModel.findById(id);
            return res;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }

    async updateUser(id:String,user:UpdateUser){
        try{
            const res = await userModel.findByIdAndUpdate(id,user); 
            return res;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }

    async getUserByemail(user:CreateUser){
        try{
            const checkUser = await userModel.findOne({emailId : user.emailId});
            return checkUser;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }

    async deleteUser(id:String){
        try{
            const res = await userModel.findByIdAndDelete(id);
            return res;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }

    async loginUser(user:CreateUser){
        try{
            const emailId = user.emailId;
            const password = user.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password.toString(),salt);
            const userCheck = await userModel.findOne({emailId:emailId,password:hashPassword});
            console.log(userCheck);
            return userCheck;
        }
        catch(err){
            console.log('inside repository',err);
        }
    }
}