import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { inject, injectable } from "inversify";
import { iocContainer as Container } from "../config/container";
import { types } from "../config/types";
import { IUserService } from "../interfaces/IUserService";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { GoogleAuthController } from "./GoogleAuthController";
import {config} from "../config/env";

const profileService = Container.get<IRegisterUserService>(types.IRegisterUserService);
const googleController = new GoogleAuthController(profileService);

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
        
        // let that = this;
        
        try{
            passport.serializeUser((user:any,done)=>{
                done(null,user.id);
            });
            
            passport.deserializeUser(async(id:String,done:passport.DoneCallback)=>{
                const currentUser = await this._UserService.getUserbyId(id);
                done(null,currentUser);
            });

            passport.use(new GoogleStrategy({
                clientID : config.GOOGLE_CLIENT_ID,
                clientSecret : config.GOOGLE_SECRET_KEY,
                callbackURL : config.GOOGLE_REDIRECT_URL,
                passReqToCallback : true
            },
            (request: any, accessToken: any, refreshToken: any, profile: passport.Profile, done: passport.DoneCallback) => {
                googleController.AuthCallback(request,accessToken,refreshToken,profile,done);
                return done(null,profile);            
            })
            );
        }
        catch(err){
            console.log(err);         
        }
    }
}