import orderModel from "../models/order.model";
import { createUpdateOrderInput, order } from "../types/userTypes";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class OrderRepository implements IOrderRepository {
  async addOrder(input: createUpdateOrderInput): Promise<order> {
    try {
      const addOrder = await orderModel.create({
        createdAt: new Date(),
        orderDate: input.orderDate,
        orderStatus: input.orderStatus,
        subTotal: input.subTotal,
        total: input.total,
        discountId: input.discountId,
        userId: input.userId,
        shippingId: input.shippingId,
      });
      console.log("addOrder:- ", addOrder);
      return addOrder;
    } catch (err) {
      throw err;
    }
  }
  async getOrderById(id: string): Promise<order> {
    try {
      const getOrder = await orderModel.findById(id);
      if (!getOrder) {
        throw new Error("Record is not there!");
      }
      return getOrder;
    } catch (err) {
      throw err;
    }
  }
  async getOrders(): Promise<order[]> {
    try {
      const getOrders = await orderModel.find();
      return getOrders;
    } catch (err) {
      throw err;
    }
  }
  async updateOrder(id: string, input: createUpdateOrderInput): Promise<order> {
    try {
      const getOrder = await this.getOrderById(id);
      if (!getOrder) {
        throw new appError("Record Not Found in Order", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateOrder = await orderModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            orderDate: input.orderDate,
            orderStatus: input.orderStatus,
            subTotal: input.subTotal,
            total: input.total,
            discountId: input.discountId,
            userId: input.userId,
            shippingId: input.shippingId,
            updatedAt: new Date(),
          },
        }
      );
      return updateOrder;
    } catch (err) {
      throw err;
    }
  }
  async deleteOrder(id: string): Promise<order> {
    try {
      const getOrder = await this.getOrderById(id);
      if (!getOrder) {
        throw new appError("Record Not Found in Order", 400);
      }
      const deleteOrder = await orderModel.findByIdAndDelete(id);
      return deleteOrder;
    } catch (err) {
      throw err;
    }
  }
}
