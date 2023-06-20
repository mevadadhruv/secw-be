import { CreateUser, GetUser, UpdateUser } from "../types/userTypes";

export interface IUserService{
    createUser(user:CreateUser):Promise<GetUser>;
    getUser():any;
    getUserbyId(id:String):Promise<GetUser>;
    updateUser(id:String,user:UpdateUser):Promise<GetUser>;
    deleteUser(id:String):Promise<GetUser>;
    LoginUser(user:CreateUser):Promise<GetUser>;
}