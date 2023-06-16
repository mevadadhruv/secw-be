import userModel from "../models/user.model";

export default class UserRepository {
    async createUser(incoming: any) {
        const emailId = incoming.emailId;
        const password = incoming.password;
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

    async updateUser(incoming:any,id:String){
        const res = await userModel.findByIdAndUpdate(id,incoming.body);
        res?.save();
        return res;
    }

    async deleteUser(id:String){
        const res = await userModel.findByIdAndRemove(id);
        return res;
    }
}