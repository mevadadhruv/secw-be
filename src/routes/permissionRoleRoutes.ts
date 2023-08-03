import express from "express";
import PermissionRoleController from "../controllers/permissionRoleController";
import { iocContainer as Container } from "../config/container";
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import { types } from "../config/types";

const permissionRoleService = Container.get<IPermissionRoleService>(
  types.IPermissionRoleService
);
const permissionRole = new PermissionRoleController(permissionRoleService);

const permissionRoleRouter = express.Router();

permissionRoleRouter.post("/createpermissionrole", (req, res, next) =>
  permissionRole.addPermissionRole(req, res, next)
);
permissionRoleRouter.get("/permissionrole", (req, res, next) =>
  permissionRole.getPermissionRoles(req, res, next)
);
permissionRoleRouter.get("/permissionrole/:id", (req, res, next) =>
  permissionRole.getPermissionRoleById(req, res, next)
);
permissionRoleRouter.delete("/deletepermissionrole/:id", (req, res, next) =>
  permissionRole.deletePermissionRole(req, res, next)
);

export default permissionRoleRouter;
