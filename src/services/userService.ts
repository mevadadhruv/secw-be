import UserRepository from "../Repositories/userRepository";
import { CreateUser,UpdateUser,GetUser } from "../types/userTypes";

const userRepository = new UserRepository();

export default class UserService {
    
    async createUser(user:CreateUser) {
        try{
            const repo = await userRepository.createUser(user);
            return repo;
        }
        catch(err){
            console.log('inside service',err);
        }
    }

    async getUser(){
        try{
            const user = await userRepository.getUser();
            return user;
        }
        catch(err){
            console.log('inside service',err);
        }
    }

    async getUserbyId(id : String){
        try{
            const users = await userRepository.getUserbyId(id); 
            return users;
        }
        catch(err){
            console.log('inside service',err);
        }
    }

    async updateUser(id:String,user:UpdateUser){
        try{
            const updateUser = await userRepository.updateUser(id,user);
            return updateUser;
        }
        catch(err){
            console.log('inside service',err);
        }
    }

    async deleteUser(id:String){
        try{
            const deleteUser = await userRepository.deleteUser(id);
            return deleteUser;
        }
        catch(err){
            console.log('inside service',err);
        } 
    }

    async LoginUser(user:CreateUser){
        try{
            const checkUser = await userRepository.loginUser(user);
            console.log(checkUser);
            return checkUser;
        }
        catch(err){
            console.log('inside service',err);
        }
    }
}