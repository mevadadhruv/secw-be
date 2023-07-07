import express from "express";
import { iocContainer as Container } from "../config/container";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";
import ProfileController from "../controllers/profileController";

const profileService = Container.get<IRegisterUserService>(types.IRegisterUserService);
const profileController = new ProfileController(profileService);

const profileRouter = express.Router();

profileRouter.post('/register',(req,res) => profileController.userRegistration(req,res));
profileRouter.put('/update-profile/:id',(req,res)=>profileController.UpdateProfile(req,res));
profileRouter.delete('/delete-profile/:id',(req,res)=>profileController.DeleteProfile(req,res));

export default profileRouter;