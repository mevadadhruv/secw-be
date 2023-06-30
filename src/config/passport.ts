// import { inject, injectable } from "inversify";
// import express from "express";
// import { IUserService } from "../interfaces/IUserService";
// import { types } from "./types";
// import passport from "passport";

// @injectable()
// export default class PassportConfiguration{
// private _UserService : IUserService;
//     constructor(@inject(types.IUserService) userService:IUserService){
//         this._UserService = userService;
//     }

//     async AuthConfiguration(req:express.Request,res:express.Response){
//         const userService = this._UserService;
//         passport.serializeUser((user:any,done)=>{
//             done(null,user.id);
//         });
        
//         passport.deserializeUser(async(id:String,done:passport.DoneCallback)=>{
//             const currentUser = await userService.getUserbyId(id);
//             done(null,currentUser);
//         });
//     }
// }