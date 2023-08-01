import express, { NextFunction } from "express";
import { IUserRoleService } from "../interfaces/IUserRoleService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { checking } from "../error/globalErrorHandler";
import {
  sendResponse,
  sendResponseDelete,
  sendResponseGet,
} from "../error/globalSuccessHandler";

@injectable()
export default class UserRoleController {
  private _UserRoleService: IUserRoleService;

  constructor(@inject(types.IUserRoleService) userRole: IUserRoleService) {
    this._UserRoleService = userRole;
  }

  async addUserRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const roleId = req.body.RoleId;
      console.log(typeof roleId);
      const userId = req.body.userId;
      console.log(":- ", typeof userId);
      const userRoleAdd = await this._UserRoleService.addUserRole(
        roleId,
        userId
      );
      if (userRoleAdd) {
        return sendResponse(200, "added", userRoleAdd, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getUserRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const findAll = await this._UserRoleService.getUserRoles();
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
      const findById = await this._UserRoleService.getUserRolebyId(id);
      if (findById) {
        return sendResponseGet(200, findById, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteUserRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const deleteUser = await this._UserRoleService.deleteUserRole(id);
      if (deleteUser) {
        return sendResponseDelete(200, "deleted", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
