import express, { NextFunction } from "express";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import {checking} from "../error/globalErrorHandler";
import {sendResponse,sendResponseDelete,sendResponseGet} from "../error/globalSuccessHandler";

@injectable()
export default class VendorUserController {
  private _VendorUserService: IVendorUserService;

  constructor(
    @inject(types.IVendorUserService) vendorUser: IVendorUserService
  ) {
    this._VendorUserService = vendorUser;
  }

  async addVendorUser(req: express.Request, res: express.Response,next:NextFunction) {
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
        return sendResponse(200,"added",vendorUserAdd,res);
      }
    } catch (err) {
      return checking(err,req,res,next);
    }
  }

  async getVendorUser(req: express.Request, res: express.Response,next:NextFunction) {
    try {
      const findAll = await this._VendorUserService.getVendorUser();
      if(findAll){
        return sendResponseGet(200,findAll,res);
      }
    } catch (err) {
      return checking(err,req,res,next);
    }
  }

  async getById(req: express.Request, res: express.Response,next:NextFunction) {
    try {
      const id = req.params.id;
      const findById = await this._VendorUserService.getVendorUserbyId(id);
      if(findById){
        return sendResponseGet(200,findById,res);
      }
    } 
    catch (err) {
      return checking(err,req,res,next);
    }
  }

  async deleteVendorUser(req: express.Request, res: express.Response,next:NextFunction) {
    try {
      const id = req.params.id;
      const deleteUser = await this._VendorUserService.deleteVendorUser(id);
      if(deleteUser){
        return sendResponseDelete(200,"deleted",res);
      }
    } catch (err) {
      return checking(err,req,res,next);
    }
  }
}