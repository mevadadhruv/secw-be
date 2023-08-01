import express from "express";
import PermissionRoleController from "../controllers/permissionRoleController";
import { iocContainer as Container } from "../config/container";
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import { types } from "../config/types";

const permissionRoleService = Container.get<IPermissionRoleService>(
  types.IPermissionRoleService
);
const permissionRole = new PermissionRoleController(permissionRoleService);

const PermissionRoleRouter = express.Router();

PermissionRoleRouter.post("/createpermissionrole", (req, res, next) =>
  permissionRole.addPermissionRole(req, res, next)
);
PermissionRoleRouter.get("/permissionrole", (req, res, next) =>
  permissionRole.getPermissionRoles(req, res, next)
);
PermissionRoleRouter.get("/permissionrole/:id", (req, res, next) =>
  permissionRole.getById(req, res, next)
);
PermissionRoleRouter.delete("/deletepermissionrole/:id", (req, res, next) =>
  permissionRole.deletePermissionRole(req, res, next)
);

export default PermissionRoleRouter;
