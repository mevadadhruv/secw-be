import express from "express";
import UserController from "../controllers/userController";
import { iocContainer as Container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { userValidation } from "../Validators/validation";
import { verifyToken } from "../middleware/Auth";

const router = express.Router();

const userService = Container.get<IUserService>(types.IUserService);
const userController = new UserController(userService);

router.post("/", verifyToken, userValidation, (req, res, next) =>
  userController.createUser(req, res, next)
);

router.get("/users", verifyToken, (req, res, next) =>
  userController.getUser(req, res, next)
);

router.get("/users/:id", verifyToken, (req, res, next) =>
  userController.getUserbyId(req, res, next)
);

router.put("/users/:id", verifyToken, userValidation, (req, res, next) =>
  userController.updateUser(req, res, next)
);

router.delete("/users/:id", verifyToken, (req, res, next) =>
  userController.deleteUser(req, res, next)
);

router.post("/login", userValidation, (req, res, next) =>
  userController.loginUser(req, res, next)
);

export default router;
