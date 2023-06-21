import { CreateUser, GetRegisterUser, RegisterUser } from "../types/userTypes";

export interface IRegisterUserRepository{
    UserRegistration(user:RegisterUser,users:CreateUser): Promise<GetRegisterUser>;
}