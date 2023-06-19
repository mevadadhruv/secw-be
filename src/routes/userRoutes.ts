import express from "express";
import UserController from "../controllers/userController";

const userController = new UserController();
const router = express.Router();

router.post('/',userController.createUser);

router.get('/users',userController.getUser);

router.get('/users/:id',userController.getUserbyId);

router.put('/users/:id',userController.updateUser);

router.delete('/users/:id',userController.deleteUser);

export default router;