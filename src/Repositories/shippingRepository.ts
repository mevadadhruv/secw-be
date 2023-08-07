import shippingModel from "../models/shipping.model";
import { createUpdateShippingInput, shipping } from "../types/userTypes";
import { IShippingRepository } from "../interfaces/IShippingRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class ShippingRepository implements IShippingRepository {
  async addShipping(input: createUpdateShippingInput): Promise<shipping> {
    try {
      const addShipping = await shippingModel.create({
        shippingType: input.shippingType,
        shippingCharge: input.shippingCharge,
        createdAt: new Date(),
      });
      return addShipping;
    } catch (err) {
      throw err;
    }
  }

  async getShippingById(id: string): Promise<shipping> {
    try {
      const getShipping = await shippingModel.findById(id);
      return getShipping;
    } catch (err) {
      throw err;
    }
  }
  async getShippings(): Promise<shipping[]> {
    try {
      const getShippings = await shippingModel.find();
      return getShippings;
    } catch (err) {
      throw err;
    }
  }
  async updateShipping(
    id: string,
    input: createUpdateShippingInput
  ): Promise<shipping> {
    try {
      const getShipping = await this.getShippingById(id);
      if (!getShipping) {
        throw new appError("Record Not Found in Shipping", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateShipping = await shippingModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            shippingType: input.shippingType,
            shippingCharge: input.shippingCharge,
            updatedAt: new Date(),
          },
        }
      );
      return updateShipping;
    } catch (err) {
      throw err;
    }
  }
  async deleteShipping(id: string): Promise<shipping> {
    try {
      const getShipping = await this.getShippingById(id);
      if (!getShipping) {
        throw new appError("Record Not Found in Shipping", 400);
      }
      const deleteShipping = await shippingModel.findByIdAndDelete(id);
      return deleteShipping;
    } catch (err) {
      throw err;
    }
  }
}
