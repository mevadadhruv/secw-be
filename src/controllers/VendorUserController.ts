import express from "express";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
const message = require("../error/globalSuccessHandler");
import sendErrorProd from "../error/globalErrorHandler";
const mongoose = require("mongoose");

@injectable()
export default class VendorUserController {
  private _VendorUserService: IVendorUserService;

  constructor(
    @inject(types.IVendorUserService) vendorUser: IVendorUserService
  ) {
    this._VendorUserService = vendorUser;
  }

  async addVendorUser(req: express.Request, res: express.Response) {
    try {
      const vendorId = req.body.VendorId;
      console.log(typeof vendorId);
      const userId = req.body.userId;
      console.log(":- ", typeof userId);
      const vendorUserAdd = await this._VendorUserService.addVendorUser(
        vendorId,
        userId
      );
      if (vendorUserAdd) {
        return message.sendResponse(200, "added", vendorUserAdd, res);
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async getVendorUser(req: express.Request, res: express.Response) {
    try {
      const findAll = await this._VendorUserService.getVendorUser();
      if(findAll){
        return message.sendResponseGet(200,findAll,res);
      }
    } catch (err) {
      return res.json({ err });
    }
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const findById = await this._VendorUserService.getVendorUserbyId(id);
      if(findById){
        return message.sendResponseGet(200,findById,res);
      }
    } 
    catch (err) {
      return res.json({ err });
    }
  }

  async deleteVendorUser(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const deleteUser = await this._VendorUserService.deleteVendorUser(id);
      if(deleteUser){
        return message.sendResponseDelete(200,"deleted",res);
      }
    } catch (err) {
      return res.json({ err });
    }
  }
}