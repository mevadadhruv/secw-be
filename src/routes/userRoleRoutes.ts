import express from "express";
import UserRoleController from "../controllers/userRoleController";
import { iocContainer as Container } from "../config/container";
import { IUserRoleService } from "../interfaces/IUserRoleService";
import { types } from "../config/types";

const userRoleService = Container.get<IUserRoleService>(types.IUserRoleService);
const userRole = new UserRoleController(userRoleService);

const UserRoleRouter = express.Router();

UserRoleRouter.post("/add", (req, res, next) =>
  userRole.addUserRole(req, res, next)
);
UserRoleRouter.get("/userrole", (req, res, next) =>
  userRole.getUserRole(req, res, next)
);
UserRoleRouter.get("/userrole/:id", (req, res, next) =>
  userRole.getById(req, res, next)
);
UserRoleRouter.delete("/delete/:id", (req, res, next) =>
  userRole.deleteUserRole(req, res, next)
);

export default UserRoleRouter;
