import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import * as dotenv from "dotenv";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IUserService } from "../interfaces/IUserService";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { CreateUser, RegisterUser } from "../types/userTypes";
import userModel from "../models/user.model";

dotenv.config();

const GoogleClientID = process.env.GOOGLE_CLIENT_ID;
const GoogleSecretKey = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

@injectable()
export default class AuthController {
private _UserService : IUserService;
private _ProfilService : IRegisterUserService;

    constructor(@inject(types.IUserService) userService:IUserService,
    @inject(types.IRegisterUserService) profileService:IRegisterUserService){
        this._UserService = userService;
        this._ProfilService = profileService;
    }

    async AuthUser(req:express.Request, res:express.Response){
        let that = this;
        try{
            passport.serializeUser((user:any,done)=>{
                done(null,user.id);
            });
            
            passport.deserializeUser(async(id:String,done:passport.DoneCallback)=>{
                const currentUser = await that._UserService.getUserbyId(id);
                done(null,currentUser);
            });

            passport.use(new GoogleStrategy({
                clientID : GoogleClientID,
                clientSecret : GoogleSecretKey,
                callbackURL : callbackURL,
                passReqToCallback : true
            },
           (request: any, accessToken: any, refreshToken: any, profile: passport.Profile, done: passport.DoneCallback) => {
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
                    const NewUser = that._ProfilService.UserRegistration(AddUser,AddUserInfo);
                    console.log(NewUser);
                    console.log("yes it saved");
                    return done(null,profile);            
            })
            );
        }
        catch(err){
            console.log(err);         
        }
    }
}