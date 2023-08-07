import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IDiscountService } from "../interfaces/IDiscountService";
import { types } from "../config/types";
import { createUpdateDiscountInput } from "../types/userTypes";

@injectable()
export default class DiscountController {
  private _discountService: IDiscountService;
  constructor(
    @inject(types.IDiscountService) discountService: IDiscountService
  ) {
    this._discountService = discountService;
  }
  async addDiscount(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateDiscountInput = {
        discountType: req.body.discountType,
        discountPrice: req.body.discountPrice,
      };
      const addDiscount = await this._discountService.addDiscount(input);
      if (addDiscount) {
        return message.sendResponse(
          200,
          "successfully created discount",
          addDiscount,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getDiscountById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getDiscounts = await this._discountService.getDiscountById(
        req.params.id
      );
      if (getDiscounts) {
        return message.sendResponse(
          200,
          "successfully get discount",
          getDiscounts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getDiscounts(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getDiscounts = await this._discountService.getDiscounts();
      if (getDiscounts) {
        return message.sendResponse(
          200,
          "successfully get discounts",
          getDiscounts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateDiscount(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateDiscountInput = {
        discountType: req.body.discountType,
        discountPrice: req.body.discountPrice,
      };
      const updatedDiscount = await this._discountService.updateDiscount(
        req.params.id,
        input
      );
      if (updatedDiscount) {
        return message.sendResponse(
          200,
          "successfully updated discount",
          updatedDiscount,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteDiscount(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteDiscount = await this._discountService.deleteDiscount(
        req.params.id
      );
      if (deleteDiscount) {
        return message.sendResponseDelete(
          200,
          "successfully deleted discount!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
