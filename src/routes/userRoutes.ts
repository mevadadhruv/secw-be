import express from "express";
import UserController from "../controllers/userController";
import { iocContainer as Container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import {UserValidation} from "../validators/validation";
import {VerifyToken} from "../middleware/auth";

const router = express.Router();

const userService = Container.get<IUserService>(types.IUserService);
const userController = new UserController(userService);

router.post('/',VerifyToken,UserValidation,(req,res,next) => userController.createUser(req,res,next));

router.get('/users',VerifyToken,(req,res) => userController.getUser(req,res));

router.get('/users/:id',VerifyToken,(req,res) => userController.getUserbyId(req,res));

router.put('/users/:id',VerifyToken,UserValidation,(req,res) => userController.updateUser(req,res));

router.delete('/users/:id',VerifyToken,(req,res) =>userController.deleteUser(req,res));

router.post('/login',UserValidation,(req,res,next) =>userController.LoginUser(req,res,next));

export default router;