import passport from "passport";
import userModel from "../models/user.model";
import { CreateUser, RegisterUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";

@injectable()
export class GoogleAuthController{
    
    private _ProfilService : IRegisterUserService;

    constructor(@inject(types.IRegisterUserService) profileService:IRegisterUserService)
    {
        this._ProfilService = profileService;
    }
    AuthCallback = (request: any, accessToken: any, refreshToken: any, profile: passport.Profile, done: passport.DoneCallback) => {
        console.log("inside await function");
        try
        {
            console.log("/......");    
            const id = profile.id;
            console.log(id);
            const email = profile!.emails[0].value;
            console.log(email);
            const firstname = profile.name?.givenName;
            console.log(firstname);
            const lastname = profile.name?.familyName;
            console.log(lastname);
            const CheckCurrentUser = userModel.findOne({emailId:email});
            console.log(CheckCurrentUser);
            console.log("it also run");
            const AddUser:RegisterUser = {first_name:firstname,last_name:lastname,Address:"",phone_number:""};
            const AddUserInfo : CreateUser = {
                    emailId: email,
                    password: "" 
                }; 
            console.log("it run also then");
            console.log(AddUser);
            console.log(AddUserInfo);
            const NewUser = this._ProfilService.UserRegistration(AddUser,AddUserInfo);
            console.log(NewUser);
            console.log("yes it saved");               
        }
        catch(err)
        {
            console.log(err);
        }
    }
}