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
            const Address = user.address;
            const first_name = user.firstName;
            const last_name = user.lastName;
            const phone_number = user.phoneNumber;
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