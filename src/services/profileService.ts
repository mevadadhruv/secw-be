import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { CreateUser, GetRegisterUser, RegisterUser } from "../types/userTypes";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import { types } from "../config/types";

@injectable()
export default class ProfileService implements IRegisterUserService{
private _profileRepository : IRegisterUserRepository;
    constructor(@inject(types.IRegisterUserRepository) profileRepo : IRegisterUserRepository){
        this._profileRepository = profileRepo;
    }
    async UserRegistration(user:RegisterUser,users:CreateUser):Promise<GetRegisterUser>{
        try{
            const registerUser = await this._profileRepository.UserRegistration(user,users);
            return registerUser ;
        }
        catch(err){
            throw(err);
        }
    }
}