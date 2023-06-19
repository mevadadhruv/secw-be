import userModel from "../models/user.model";
import { CreateUser,UpdateUser,GetUser } from "../types/userTypes";

export default class UserRepository {
    async createUser(user:CreateUser) {
        const emailId = user.emailId;
        const password = user.password;
        const res = await userModel.create(
            { emailId, password }
        );
        return res;
    }

    async getUser(){
        const res = await userModel.find();
        return res; 
    }

    async getUserbyId(id:String){
        const res = await userModel.findById(id);
        return res;
    }

    async updateUser(id:String,user:UpdateUser){
        const res = await userModel.findByIdAndUpdate(id,user); 
        return res;
    }

    async deleteUser(id:String){
        const res = await userModel.findByIdAndDelete(id);
        return res;
    }
}