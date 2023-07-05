import express from "express";
import { CreateUser, RegisterUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";

@injectable()
export default class ProfileController{
private _profileService : IRegisterUserService;

    constructor(@inject(types.IRegisterUserService) profileService : IRegisterUserService){
        this._profileService = profileService;
    }

    async userRegistration(req : express.Request,res: express.Response){
        try{
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
            const registerUser = await this._profileService.UserRegistration(register,Registeration);
            if(registerUser){
                return res.status(200).json({message : "User register successfully!!"});
            }
        }
        catch(err){
            return res.json({err});
        }
    }

}