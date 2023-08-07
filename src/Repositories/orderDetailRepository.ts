import orderDetailModel from "../models/orderDetail.model";
import { createUpdateOrderDetailInput, orderDetail } from "../types/userTypes";
import { IOrderDetailRepository } from "../interfaces/IOrderDetailRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class OrderDetailRepository implements IOrderDetailRepository {
  async addOrderDetail(
    input: createUpdateOrderDetailInput
  ): Promise<orderDetail> {
    try {
      const addOrderDetail = await orderDetailModel.create({
        createdAt: new Date(),
        quantity: input.quantity,
        itemPrice: input.itemPrice,
        itemTotal: input.itemTotal,
        productId: input.productId,
        orderId: input.orderId,
        userId: input.userId,
      });
      console.log("addOrderDetail:- ", addOrderDetail);
      return addOrderDetail;
    } catch (err) {
      throw err;
    }
  }
  async getOrderDetailById(id: string): Promise<orderDetail> {
    try {
      if (id.trim() === "") {
        throw new Error(`Please provide Id `);
      }
      const getOrderDetail = await orderDetailModel.findById(id);
      if (!getOrderDetail) {
        throw new Error("Record is not there!");
      }
      return getOrderDetail;
    } catch (err) {
      throw err;
    }
  }
  async getOrderDetails(): Promise<orderDetail[]> {
    try {
      const getOrderDetails = await orderDetailModel.find();
      return getOrderDetails;
    } catch (err) {
      throw err;
    }
  }
  async updateOrderDetail(
    id: string,
    input: createUpdateOrderDetailInput
  ): Promise<orderDetail> {
    try {
      const getOrderDetail = await this.getOrderDetailById(id);
      if (!getOrderDetail) {
        throw new appError("Record Not Found in OrderDetail", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateOrderDetail = await orderDetailModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            quantity: input.quantity,
            itemPrice: input.itemPrice,
            itemTotal: input.itemTotal,
            productId: input.productId,
            orderId: input.orderId,
            userId: input.userId,
            updatedAt: new Date(),
          },
        }
      );
      return updateOrderDetail;
    } catch (err) {
      throw err;
    }
  }
  async deleteOrderDetail(id: string): Promise<orderDetail> {
    try {
      const getOrderDetail = await this.getOrderDetailById(id);
      if (!getOrderDetail) {
        throw new appError("Record Not Found in OrderDetail", 400);
      }
      const deleteOrderDetail = await orderDetailModel.findByIdAndDelete(id);
      return deleteOrderDetail;
    } catch (err) {
      throw err;
    }
  }
}
