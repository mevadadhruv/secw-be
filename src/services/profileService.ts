import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { CreateUser, GetRegisterUser, RegisterUser, DocumentType } from "../types/userTypes";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import { types } from "../config/types";

@injectable()
export default class ProfileService implements IRegisterUserService{
private _profileRepository : IRegisterUserRepository;
    constructor(@inject(types.IRegisterUserRepository) profileRepo : IRegisterUserRepository){
        this._profileRepository = profileRepo;
    }
    async UserRegistration(user:RegisterUser,users:CreateUser,document : DocumentType):Promise<GetRegisterUser>{
        try{
            const registerUser = await this._profileRepository.UserRegistration(user,users,document);
            return registerUser ;
        }
        catch(err){
            throw(err);
        }
    }

    async UpdateProfile(id:string,user:RegisterUser):Promise<GetRegisterUser>{
        try{
            const updateProfile = await this._profileRepository.UpdateProfile(id,user);
            return updateProfile;
        }
        catch(err){
            throw(err);
        }
    }

    async deleteProfile(id:string):Promise<GetRegisterUser>{
        try{
            const DeleteProfile = await this._profileRepository.deleteProfile(id);
            return DeleteProfile;
        }
        catch(err){
            throw(err);
        }
    }
}