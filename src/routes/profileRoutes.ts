import express from "express";
import { iocContainer as Container } from "../config/container";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";
import ProfileController from "../controllers/profileController";

const profileService = Container.get<IRegisterUserService>(types.IRegisterUserService);
const profileController = new ProfileController(profileService);

const profileRouter = express.Router();

profileRouter.post('/register',(req,res,next) => profileController.userRegistration(req,res,next));
profileRouter.put('/update-profile/:id',(req,res,next)=>profileController.updateProfile(req,res,next));
profileRouter.delete('/delete-profile/:id',(req,res,next)=>profileController.deleteProfile(req,res,next));

export default profileRouter;