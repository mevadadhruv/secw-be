import express, { NextFunction } from "express";
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { checking } from "../error/globalErrorHandler";
import {
  sendResponse,
  sendResponseDelete,
  sendResponseGet,
} from "../error/globalSuccessHandler";

@injectable()
export default class PermissionRoleController {
  private _permissionRoleService: IPermissionRoleService;

  constructor(
    @inject(types.IPermissionRoleService) vendorUser: IPermissionRoleService
  ) {
    this._permissionRoleService = vendorUser;
  }

  async addPermissionRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const permissionId = req.body.permissionId;
      const roleId = req.body.roleId;
      const vendorUserAdd = await this._permissionRoleService.addPermissionRole(
        permissionId,
        roleId
      );
      if (vendorUserAdd) {
        return sendResponse(200, "added", vendorUserAdd, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getPermissionRoles(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const findAll = await this._permissionRoleService.getPermissionRoles();
      if (findAll) {
        return sendResponseGet(200, findAll, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const findById = await this._permissionRoleService.getPermissionRolebyId(
        id
      );
      if (findById) {
        return sendResponseGet(200, findById, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deletePermissionRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const deleteUser = await this._permissionRoleService.deletePermissionRole(
        id
      );
      if (deleteUser) {
        return sendResponseDelete(200, "deleted", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
