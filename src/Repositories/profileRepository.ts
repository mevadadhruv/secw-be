import { inject, injectable } from "inversify";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import profileModel from "../models/profile.model";
import { CreateUser, GetRegisterUser, RegisterUser } from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";

@injectable()
export default class profileRepository implements IRegisterUserRepository{
private _userRepository : IUserRepository;
    
    constructor(@inject(types.IUserRepository) userRepo:IUserRepository){
        this._userRepository = userRepo;
    }

    async UserRegistration(user:RegisterUser,users:CreateUser): Promise<GetRegisterUser>{
        try{
            const Address = user.Address;
            const first_name = user.first_name;
            const last_name = user.last_name;
            const phone_number = user.phone_number;
            const userRegister = this._userRepository.createUser(users);
            const userId = (await userRegister).id;
            const RegisterUser = await profileModel.create({
                 Address,first_name,last_name,phone_number,userId
            });
            return RegisterUser;
        }
        catch(err){
            throw(err);
        }
    }
}