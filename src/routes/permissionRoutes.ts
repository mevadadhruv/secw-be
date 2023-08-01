import express from "express";
import PermissionController from "../controllers/permissionController";
import { iocContainer as Container } from "../config/container";
import { IPermissionService } from "../interfaces/IPermissionService";
import { types } from "../config/types";

const permissionService = Container.get<IPermissionService>(
  types.IPermissionService
);
const permissionController = new PermissionController(permissionService);

const permissionRouter = express.Router();

permissionRouter.post("/createpermission", (req, res, next) =>
  permissionController.addPermission(req, res, next)
);
permissionRouter.get("/getpermission/:id", (req, res, next) =>
  permissionController.getPermissionById(req, res, next)
);
permissionRouter.get("/getpermissions", (req, res, next) =>
  permissionController.getPermissions(req, res, next)
);
permissionRouter.put("/updatepermission/", (req, res, next) =>
  permissionController.updatePermission(req, res, next)
);
permissionRouter.delete("/deletepermission/:id", (req, res, next) =>
  permissionController.deletePermission(req, res, next)
);

export default permissionRouter;
