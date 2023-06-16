import express from "express";
import UserController from "../controllers/userController";

const controller = new UserController();
const router = express.Router();

router.post('/',controller.createUser);

router.get('/users',controller.getUser);

router.get('/users/:id',controller.getUserbyId);

router.patch('/users/:id',controller.updateUser);

router.delete('/users/:id',controller.deleteUser);

export default router;