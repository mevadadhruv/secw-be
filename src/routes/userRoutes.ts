import express from "express";
import UserController from "../controllers/userController";
import { iocContainer as Container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";

const router = express.Router();

const userService = Container.get<IUserService>(types.IUserService);
const userController = new UserController(userService);

router.post('/',(req,res,next) => userController.createUser(req,res,next));

router.get('/users',(req,res,next) => userController.getUser(req,res,next));

router.get('/users/:id',(req,res,next) => userController.getUserbyId(req,res,next));

router.put('/users/:id',(req,res,next) => userController.updateUser(req,res,next));

router.delete('/users/:id',(req,res,next) =>userController.deleteUser(req,res,next));

router.post('/login',(req,res,next) =>userController.LoginUser(req,res,next));

export default router;