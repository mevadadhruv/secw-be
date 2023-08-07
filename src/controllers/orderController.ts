import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IOrderService } from "../interfaces/IOrderService";
import { types } from "../config/types";
import { createUpdateOrderInput } from "../types/userTypes";

@injectable()
export default class OrderController {
  private _orderService: IOrderService;
  constructor(@inject(types.IOrderService) orderService: IOrderService) {
    this._orderService = orderService;
  }
  async addOrder(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateOrderInput = {
        orderDate: new Date(),
        orderStatus: req.body.orderStatus,
        subTotal: req.body.subTotal,
        total: req.body.total,
        discountId: req.body.discountId,
        userId: req.body.userId,
        shippingId: req.body.shippingId,
        createdAt: new Date(),
      };
      const addOrder = await this._orderService.addOrder(input);
      if (addOrder) {
        return message.sendResponse(
          200,
          "successfully created order",
          addOrder,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getOrderById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getOrders = await this._orderService.getOrderById(req.params.id);
      if (getOrders) {
        return message.sendResponse(
          200,
          "successfully get order",
          getOrders,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getOrders(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getOrders = await this._orderService.getOrders();
      if (getOrders) {
        return message.sendResponse(
          200,
          "successfully get orders",
          getOrders,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateOrder(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const input: createUpdateOrderInput = {
        orderStatus: req.body.orderStatus,
        subTotal: req.body.subTotal,
        total: req.body.total,
        discountId: req.body.discountId,
        userId: req.body.userId,
        shippingId: req.body.shippingId,
        updatedAt: new Date(),
      };
      const updatedOrder = await this._orderService.updateOrder(
        req.params.id,
        input
      );
      if (updatedOrder) {
        return message.sendResponse(
          200,
          "successfully updated order",
          updatedOrder,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteOrder(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteOrder = await this._orderService.deleteOrder(req.params.id);
      if (deleteOrder) {
        return message.sendResponseDelete(
          200,
          "successfully deleted order!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
