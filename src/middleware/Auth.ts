import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import AppError from "../Error/AppError";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const VerifyToken = async(req:express.Request,res:express.Response,next:NextFunction) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        console.log(token);
        if(!token){
            next(new AppError("PLease Login First to continue",403));
        }
        try{
            const decoded = jwt.verify(token,secretKey);
            req.user = decoded;
        }
        catch(err){
            next(new AppError("invalid token",402));
        }
        return next();
}