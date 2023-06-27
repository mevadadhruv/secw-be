import express from "express";
import passport from "passport";
import userModel from "../models/user.model";
import { CreateUser, RegisterUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";

@injectable()
export class GoogleAuthController{
    private _ProfilService : IRegisterUserService;

    constructor(@inject(types.IRegisterUserService) profileService:IRegisterUserService){
        this._ProfilService = profileService;
    }

async AuthenticateUser(req:express.Request,res:express.Response){
    let that = this;
    console.log("inside async function");
    await function(request: any, accessToken: any, refreshToken: any, profile: passport.Profile, done: passport.DoneCallback){
        console.log("inside await function");
        try{
                const id = profile.id;
                const email = profile!.emails[0].value;
                const firstname = profile.name?.givenName;
                const lastname = profile.name?.familyName;
                const CheckCurrentUser = userModel.findOne({emailId:email});
                console.log("it also run");
                const AddUser:RegisterUser = {first_name:firstname,last_name:lastname};
                const AddUserInfo : CreateUser = {
                        emailId: email,
                        password: "" 
                    }; 
                    console.log("and then it also");
                if(!CheckCurrentUser) {
                        const NewUser = that._ProfilService.UserRegistration(AddUser,AddUserInfo);
                        return done(null,NewUser);
                    }
                    console.log("an dthen it alsoooo");
                return done(null,profile);
        }
        catch(err){
            console.log(err);
        }
    }
}         
}