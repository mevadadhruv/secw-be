import { CreateUser, GetRegisterUser, RegisterUser } from "../types/userTypes";

export interface IRegisterUserService{
    UserRegistration(user:RegisterUser,users:CreateUser):Promise<GetRegisterUser>;
}