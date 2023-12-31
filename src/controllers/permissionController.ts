import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IPermissionService } from "../interfaces/IPermissionService";
import { types } from "../config/types";

@injectable()
export default class PermissionController {
  private _permissionService: IPermissionService;
  constructor(
    @inject(types.IPermissionService) permissionService: IPermissionService
  ) {
    this._permissionService = permissionService;
  }
  async addPermission(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const addPermission = await this._permissionService.addPermission(
        req.body.name,
        req.body.description
      );
      if (addPermission) {
        return message.sendResponse(
          200,
          "successfully created permission",
          addPermission,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getPermissionById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getPermissions = await this._permissionService.getPermissionById(
        req.params.id
      );
      console.log("getPermissions:-  ", getPermissions);

      if (getPermissions) {
        return message.sendResponse(
          200,
          "successfully get permission",
          getPermissions,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getPermissions(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getPermissions = await this._permissionService.getPermissions();
      if (getPermissions) {
        return message.sendResponse(
          200,
          "successfully get permissions",
          getPermissions,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updatePermission(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updatedPermission = await this._permissionService.updatePermission(
        req.body.id,
        req.body.name,
        req.body.description
      );

      if (updatedPermission) {
        return message.sendResponse(
          200,
          "successfully updated permission",
          updatedPermission,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deletePermission(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deletePermission = await this._permissionService.deletePermission(
        req.params.id
      );
      if (deletePermission) {
        return message.sendResponseDelete(
          200,
          "successfully deleted permission!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
