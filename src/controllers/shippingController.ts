import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IShippingService } from "../interfaces/IShippingService";
import { types } from "../config/types";
import { createUpdateShippingInput } from "../types/userTypes";

@injectable()
export default class ShippingController {
  private _shippingService: IShippingService;
  constructor(
    @inject(types.IShippingService) shippingService: IShippingService
  ) {
    this._shippingService = shippingService;
  }
  async addShipping(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateShippingInput = {
        shippingType: req.body.shippingType,
        shippingCharge: req.body.shippingCharge,
      };
      const addShipping = await this._shippingService.addShipping(input);
      if (addShipping) {
        return message.sendResponse(
          200,
          "successfully created shipping",
          addShipping,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getShippingById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getShippings = await this._shippingService.getShippingById(
        req.params.id
      );
      if (getShippings) {
        return message.sendResponse(
          200,
          "successfully get shipping",
          getShippings,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getShippings(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getShippings = await this._shippingService.getShippings();
      if (getShippings) {
        return message.sendResponse(
          200,
          "successfully get shippings",
          getShippings,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateShipping(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateShippingInput = {
        shippingType: req.body.shippingType,
        shippingCharge: req.body.shippingCharge,
      };
      const updatedShipping = await this._shippingService.updateShipping(
        req.params.id,
        input
      );
      if (updatedShipping) {
        return message.sendResponse(
          200,
          "successfully updated shipping",
          updatedShipping,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteShipping(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteShipping = await this._shippingService.deleteShipping(
        req.params.id
      );
      if (deleteShipping) {
        return message.sendResponseDelete(
          200,
          "successfully deleted shipping!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
