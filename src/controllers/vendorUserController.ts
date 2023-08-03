import express, { NextFunction } from "express";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { checking } from "../error/globalErrorHandler";
import {
  sendResponse,
  sendResponseDelete,
  sendResponseGet,
} from "../error/globalSuccessHandler";

@injectable()
export default class VendorUserController {
  private _VendorUserService: IVendorUserService;

  constructor(
    @inject(types.IVendorUserService) vendorUser: IVendorUserService
  ) {
    this._VendorUserService = vendorUser;
  }

  async addVendorUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const vendorUserAdd = await this._VendorUserService.addVendorUser(
        req.body.vendorId,
        req.body.userId
      );
      if (vendorUserAdd) {
        return sendResponse(200, "added", vendorUserAdd, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getVendorUsers(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const findAll = await this._VendorUserService.getVendorUsers();
      if (findAll) {
        return sendResponseGet(200, findAll, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getVendorUserById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const findById = await this._VendorUserService.getVendorUserbyId(
        req.params.id
      );
      if (findById) {
        return sendResponseGet(200, findById, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteVendorUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteUser = await this._VendorUserService.deleteVendorUser(
        req.params.id
      );
      if (deleteUser) {
        return sendResponseDelete(200, "deleted", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
