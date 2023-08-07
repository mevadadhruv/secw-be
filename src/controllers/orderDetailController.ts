import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IOrderDetailService } from "../interfaces/IOrderDetailService";
import { types } from "../config/types";
import { createUpdateOrderDetailInput } from "../types/userTypes";

@injectable()
export default class OrderDetailController {
  private _orderDetailService: IOrderDetailService;
  constructor(
    @inject(types.IOrderDetailService) orderDetailService: IOrderDetailService
  ) {
    this._orderDetailService = orderDetailService;
  }
  async addOrderDetail(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateOrderDetailInput = {
        quantity: req.body.quantity,
        itemPrice: req.body.itemPrice,
        itemTotal: req.body.itemTotal,
        productId: req.body.productId,
        orderId: req.body.orderId,
        userId: req.body.userId,
        createdAt: new Date(),
      };
      const addOrderDetail = await this._orderDetailService.addOrderDetail(
        input
      );
      if (addOrderDetail) {
        return message.sendResponse(
          200,
          "successfully created orderDetail",
          addOrderDetail,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getOrderDetailById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getOrderDetails = await this._orderDetailService.getOrderDetailById(
        req.params.id
      );
      if (getOrderDetails) {
        return message.sendResponse(
          200,
          "successfully get orderDetail",
          getOrderDetails,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getOrderDetails(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getOrderDetails = await this._orderDetailService.getOrderDetails();
      if (getOrderDetails) {
        return message.sendResponse(
          200,
          "successfully get orderDetails",
          getOrderDetails,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateOrderDetail(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateOrderDetailInput = {
        quantity: req.body.quantity,
        itemPrice: req.body.itemPrice,
        itemTotal: req.body.itemTotal,
        productId: req.body.productId,
        orderId: req.body.orderId,
        userId: req.body.userId,
        updatedAt: new Date(),
      };
      const updatedOrderDetail =
        await this._orderDetailService.updateOrderDetail(req.params.id, input);
      if (updatedOrderDetail) {
        return message.sendResponse(
          200,
          "successfully updated orderDetail",
          updatedOrderDetail,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteOrderDetail(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteOrderDetail =
        await this._orderDetailService.deleteOrderDetail(req.params.id);
      if (deleteOrderDetail) {
        return message.sendResponseDelete(
          200,
          "successfully deleted orderDetail!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
