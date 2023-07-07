import { inject, injectable } from "inversify";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import profileModel from "../models/profile.model";
import { CreateUser, GetRegisterUser, RegisterUser, DocumentType } from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";

@injectable()
export default class profileRepository implements IRegisterUserRepository{

    private _userRepository : IUserRepository;
    private _documentRepository : IDocumentRepository;

    constructor(@inject(types.IUserRepository) userRepo:IUserRepository,@inject(types.IDocumentRepository) documentRepo:IDocumentRepository){
        this._userRepository = userRepo;
        this._documentRepository = documentRepo;
    }

    async UserRegistration(user:RegisterUser,users:CreateUser,document:DocumentType): Promise<GetRegisterUser>{
        try{
            const documentRegister = await this._documentRepository.AddDocument(document);
            const documentId = documentRegister;
            const Address = user.address;
            const first_name = user.firstName;
            const last_name = user.lastName;
            const phone_number = user.phoneNumber;
            const userRegister = await this._userRepository.createUser(users);
            console.log("document register",documentRegister);
            const userId = (await userRegister).id;
            console.log("inside repository", documentId);
            const RegisterUser = await profileModel.create({
                 Address,first_name,last_name,phone_number,userId,documentId:documentId.id
            });
            return RegisterUser;
        }
        catch(err){
            throw(err);
        }
    }

    async UpdateProfile(id:string,user:RegisterUser):Promise<GetRegisterUser>{
        try{
            const updateProfile = await profileModel.findByIdAndUpdate(id,user);
            return {id:updateProfile.id,address:updateProfile.Address,firstName:updateProfile.first_name,lastName:updateProfile.last_name,phoneNumber:updateProfile.phone_number};
        }
        catch(err){
            throw(err);
        }
    }

    async deleteProfile(id:string):Promise<GetRegisterUser>{
        try{
            const Deleteprofile = await profileModel.findByIdAndDelete(id);
            return{id:Deleteprofile.id,address:Deleteprofile.Address,firstName:Deleteprofile.first_name,lastName:Deleteprofile.last_name,phoneNumber:Deleteprofile.phone_number};
        }
        catch(err){
            throw(err);
        }
    }
}