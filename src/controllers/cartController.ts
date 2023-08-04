import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { ICartService } from "../interfaces/ICartService";
import { types } from "../config/types";
import { createUpdateCartInput } from "../types/userTypes";

@injectable()
export default class CartController {
  private _cartService: ICartService;
  constructor(@inject(types.ICartService) cartService: ICartService) {
    this._cartService = cartService;
  }
  async addCart(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const inputs: createUpdateCartInput = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        userId: req.body.userId,
      };
      console.log("\n input:- ", inputs);

      const addCart = await this._cartService.addCart(inputs);
      if (addCart) {
        return message.sendResponse(
          200,
          "successfully created cart",
          addCart,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCartById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getCarts = await this._cartService.getCartById(req.params.id);
      if (getCarts) {
        return message.sendResponse(
          200,
          "successfully get cart",
          getCarts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCarts(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getCarts = await this._cartService.getCarts();
      if (getCarts) {
        return message.sendResponse(
          200,
          "successfully get carts",
          getCarts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateCart(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const inputs: createUpdateCartInput = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        userId: req.body.userId,
      };
      console.log("\n input:- ", inputs);
      const updatedCart = await this._cartService.updateCart(
        req.body.id,
        inputs
      );
      if (updatedCart) {
        return message.sendResponse(
          200,
          "successfully updated cart",
          updatedCart,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteCart(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteCart = await this._cartService.deleteCart(req.params.id);
      if (deleteCart) {
        return message.sendResponseDelete(
          200,
          "successfully deleted cart!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
