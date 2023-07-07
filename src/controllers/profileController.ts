import express from "express";
import { CreateUser, RegisterUser, DocumentType } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";
import document from "../config/Document";
import AppError from "../Error/AppError";

@injectable()
export default class ProfileController{
private _profileService : IRegisterUserService;

    constructor(@inject(types.IRegisterUserService) profileService : IRegisterUserService){
        this._profileService = profileService;
    }

    async userRegistration(req : express.Request,res: express.Response){
        try{
            const uplodImage = document("dhruv-images").single("Attachment");
            uplodImage(req,res,async(err)=>{
                if(err){
                    return new AppError("Image not found", 301);
                }
                const documentFile : any = req.file;
                const documentName = documentFile.originalname;
                const documentDescription = documentFile.encoding;
                const documentAttachment = documentFile.location;
                const documentExtension = documentFile.mimetype;
                const documentSize = documentFile.size;
                const documentType : DocumentType = {
                    name : documentName,
                    description : documentDescription,
                    attachment : documentAttachment,
                    extension : documentExtension,
                    size : documentSize
                };
                const register : RegisterUser = {
                    address: req.body.Address,
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    phoneNumber: req.body.phone_number
                };
                const Registeration : CreateUser = {
                    emailId: req.body.emailId,
                    password: req.body.password
                };
                console.log(documentType);
                const registerUser = await this._profileService.UserRegistration(register,Registeration,documentType);
                if(registerUser){
                    return res.status(200).json({message : "User register successfully!!"});
                }
            })
        }
        catch(err){
            return res.json({err});
        }
    }

    async UpdateProfile(req:express.Request,res:express.Response){
        try{
            const updateProfileId = req.params.id;
            const Profile : RegisterUser = {
                address: req.body.Address,
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                phoneNumber: req.body.phone_number
            };
            const updateProfile = await this._profileService.UpdateProfile(updateProfileId,Profile);
            if(updateProfile){
                
            }
        }
        catch(err){
            return res.json({err});
        }
    }

    async DeleteProfile(req:express.Request,res:express.Response){
        try{

        }
        catch(err){
            return res.json({err});
        }
    }
}