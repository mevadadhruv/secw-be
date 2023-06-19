import UserRepository from "../Repositories/userRepository";
import { CreateUser,UpdateUser,GetUser } from "../types/userTypes";

const userRepository = new UserRepository();

export default class UserService {
    async createUser(user:CreateUser) {
        const repo = await userRepository.createUser(user);
        return repo;
    }

    async getUser(){
        const user = await userRepository.getUser();
        return user;
    }

    async getUserbyId(id : String){
        const users = await userRepository.getUserbyId(id); 
        return users;
    }

    async updateUser(id:String,user:UpdateUser){
        const updateUser = await userRepository.updateUser(id,user);
        return updateUser;
    }

    async deleteUser(id:String){
        const deleteUser = await userRepository.deleteUser(id);
        return deleteUser; 
    }

}