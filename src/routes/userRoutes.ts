import express from "express";
import UserController from "../controllers/userController";
import { iocContainer as Container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { UserValidation } from "../Validators/validation";
import { VerifyToken } from "../middleware/Auth";

const router = express.Router();

const userService = Container.get<IUserService>(types.IUserService);
const userController = new UserController(userService);

router.post("/", VerifyToken, UserValidation, (req, res, next) =>
  userController.createUser(req, res, next)
);

router.get("/users", VerifyToken, (req, res, next) =>
  userController.getUser(req, res, next)
);

router.get("/users/:id", VerifyToken, (req, res, next) =>
  userController.getUserbyId(req, res, next)
);

router.put("/users/:id", VerifyToken, UserValidation, (req, res, next) =>
  userController.updateUser(req, res, next)
);

router.delete("/users/:id", VerifyToken, (req, res, next) =>
  userController.deleteUser(req, res, next)
);

router.post("/login", UserValidation, (req, res, next) =>
  userController.LoginUser(req, res, next)
);

export default router;
