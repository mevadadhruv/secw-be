import express, { NextFunction } from "express";
import { inject, injectable } from "inversify";
import { IVendorService } from "../interfaces/IVendorService";
import { types } from "../config/types";
import { Vendor } from "../types/userTypes";
import logo from "../config/document";
const message = require("../error/globalSuccessHandler");
import appError from "../error/appError";
import { checking, sendErrorProd } from "../error/globalErrorHandler";
import document from "../config/document";
import { documentType } from "../types/userTypes";

@injectable()
export default class VendorController {
  private _vendorService: IVendorService;

  constructor(@inject(types.IVendorService) vendorService: IVendorService) {
    this._vendorService = vendorService;
  }

  async addVendor(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      //console.log("name",req.body.name);
      const uplodImage = document("dhruv-images").single("logo");
      console.log("test");
      uplodImage(req, res, async (err: any) => {
        if (err) {
          return new appError("Image not found", 301);
        }
        const documentFile: any = req.file;
        const documentName = documentFile.originalname;
        const documentDescription = documentFile.encoding;
        const documentAttachment = documentFile.location;
        const documentExtension = documentFile.mimetype;
        const documentSize = documentFile.size;
        const documentType: documentType = {
          name: documentName,
          description: documentDescription,
          attachment: documentAttachment,
          extension: documentExtension,
          size: documentSize,
        };
        const vendor: Vendor = {
          name: req.body.name
        };
        //console.log(vendor.name);
        const addVendor = await this._vendorService.addVendor(vendor,documentType);
        if (addVendor) {
          return message.sendResponse(200, "vendor created", addVendor, res);
        } else {
          return new appError("something went very wrong", 400);
        }
      });
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getVendors(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getvendors = await this._vendorService.getVendors();
      if (getvendors) {
        return message.sendResponseGet(200, getvendors, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getVendorById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getVendorByID = await this._vendorService.getVendorById(
        req.params.id
      );
      if (getVendorByID) {
        return message.sendResponseGet(200, getVendorByID, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async updateVendor(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const vendorId = req.params.id;
      const uploadImage = logo("dhruv-images").single("logo");
      uploadImage(req, res, async (err: any) => {
        if (err) {
          return new appError("Image not found", 301);
        }
        const documentFile: any = req.file;
        //console.log(documentFile);
        const documentAttachment = documentFile.location;
        //console.log(documentAttachment);
        const vendor: Vendor = {
          name: req.body.name
        };
        //console.log(vendor.name);
        const updateVendor = await this._vendorService.updateVendor(
          vendorId,
          vendor
        );
        if (updateVendor) {
          return message.sendResponse(200, "vendor updated", updateVendor, res);
        } else {
          return new appError("something went very wrong", 400);
        }
      });
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteVendor(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deletevendor = await this._vendorService.deleteVendor(
        req.params.id
      );
      if (deletevendor) {
        return message.sendResponseDelete(200, "deleted sucessfully!", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
