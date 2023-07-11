import { CreateUser,UpdateUser,GetUser } from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable, inject } from "inversify";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import AppError from "../error/appError";
import userModel from "../models/user.model";

@injectable()
export default class UserService implements IUserService{
private _userrepository : IUserRepository;

    constructor(@inject(types.IUserRepository) userRepository : IUserRepository){
        this._userrepository = userRepository;
    }

    async createUser(user:CreateUser):Promise<GetUser>{
        try{
            const existingUser = await userModel.findOne({emailId:user.emailId});
            if(existingUser){
                throw new AppError("email is already exist",400);
            }
            const repo = await this._userrepository.createUser(user);
            return repo;
        }
        catch(err){
            throw(err);
        }
    }

    async getUser(){
        try{
            const user = await this._userrepository.getUser();
            return user;
        }
        catch(err){
            throw(err);
        }
    }

    async getUserbyId(id : String):Promise<GetUser>{
        try{
            const users = await this._userrepository.getUserbyId(id);
            if(!users){
                throw new AppError("user does not exist",400);
            }
            else{
                return users;
            } 
        }
        catch(err){
            throw(err);
        }
    }

    async updateUser(id:String,user:UpdateUser):Promise<GetUser>{
        try{
            const users = await this._userrepository.getUserbyId(id);
            if(!users){
                throw new AppError("user does not exist",400);
            }
            else{
                const updateUser = await this._userrepository.updateUser(id,user);
                return updateUser;
            }
        }
        catch(err){
            throw(err);
        }
    }

    async deleteUser(id:String):Promise<GetUser>{
        try{
            const users = await this._userrepository.getUserbyId(id);
            if(!users){
                throw new AppError("user does not exist",400);
            }
            else{
                const deleteUser = await this._userrepository.deleteUser(id);
                return deleteUser;
            }
        }
        catch(err){
            throw(err);
        } 
    }

    async LoginUser(user:CreateUser):Promise<GetUser>{
        try{
            const checkUser = await this._userrepository.loginUser(user);
            console.log(checkUser);
            return checkUser;
        }
        catch(err){
            throw(err);
        }
    }
}