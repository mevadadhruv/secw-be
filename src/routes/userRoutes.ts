import express from "express";
import UserController from "../controllers/userController";
import { iocContainer as Container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import {UserValidation} from "../Validators/validation";

const router = express.Router();

const userService = Container.get<IUserService>(types.IUserService);
const userController = new UserController(userService);

router.post('/',UserValidation,(req,res) => userController.createUser(req,res));

router.get('/users',(req,res) => userController.getUser(req,res));

router.get('/users/:id',(req,res) => userController.getUserbyId(req,res));

router.put('/users/:id',UserValidation,(req,res) => userController.updateUser(req,res));

router.delete('/users/:id',(req,res) =>userController.deleteUser(req,res));

router.post('/login',UserValidation,(req,res) =>userController.LoginUser(req,res));

export default router;