import { CreateUser, GetUser, UpdateUser } from "../types/userTypes";

export interface IUserRepository{
    createUser(user:CreateUser) : Promise<GetUser>;
    getUser():any;
    getUserbyId(id:String) : Promise<GetUser>;
    updateUser(id:String,user:UpdateUser):Promise<GetUser>;
    deleteUser(id:String):Promise<GetUser>;
    loginUser(user:CreateUser):Promise<GetUser>;
}