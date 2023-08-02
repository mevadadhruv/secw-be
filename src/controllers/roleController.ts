import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IRoleService } from "../interfaces/IRoleService";
import { types } from "../config/types";

@injectable()
export default class RoleController {
  private _roleService: IRoleService;
  constructor(@inject(types.IRoleService) roleService: IRoleService) {
    this._roleService = roleService;
  }
  async addRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const addRole = await this._roleService.addRole(req.body.name);
      if (addRole) {
        return message.sendResponse(
          200,
          "successfully created role",
          addRole,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getRoleById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getRoles = await this._roleService.getRoleById(req.params.id);
      if (getRoles) {
        return message.sendResponse(
          200,
          "successfully get role",
          getRoles,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getRoles(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getRoles = await this._roleService.getRoles();
      if (getRoles) {
        return message.sendResponse(
          200,
          "successfully get roles",
          getRoles,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updatedRole = await this._roleService.updateRole(
        req.body.id,
        req.body.name
      );
      if (updatedRole) {
        return message.sendResponse(
          200,
          "successfully updated role",
          updatedRole,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteRole(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteRole = await this._roleService.deleteRole(req.params.id);
      if (deleteRole) {
        return message.sendResponseDelete(
          200,
          "successfully deleted role!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
