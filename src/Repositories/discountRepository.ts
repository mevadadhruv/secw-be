import discountModel from "../models/discount.model";
import { createUpdateDiscountInput, discount } from "../types/userTypes";
import { IDiscountRepository } from "../interfaces/IDiscountRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class DiscountRepository implements IDiscountRepository {
  async addDiscount(input: createUpdateDiscountInput): Promise<discount> {
    try {
      const addDiscount = await discountModel.create({
        discountType: input.discountType,
        discountPrice: input.discountPrice,
        createdAt: new Date(),
      });
      return addDiscount;
    } catch (err) {
      throw err;
    }
  }

  async getDiscountById(id: string): Promise<discount> {
    try {
      const getDiscount = await discountModel.findById(id);
      if (!getDiscount) {
        throw new Error("Record is not there!");
      }
      return getDiscount;
    } catch (err) {
      throw err;
    }
  }
  async getDiscounts(): Promise<discount[]> {
    try {
      const getDiscounts = await discountModel.find();
      return getDiscounts;
    } catch (err) {
      throw err;
    }
  }
  async updateDiscount(
    id: string,
    input: createUpdateDiscountInput
  ): Promise<discount> {
    try {
      const getDiscount = await this.getDiscountById(id);
      if (!getDiscount) {
        throw new appError("Record Not Found in Discount", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateDiscount = await discountModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            discountType: input.discountType,
            discountPrice: input.discountPrice,
            updatedAt: new Date(),
          },
        }
      );
      return updateDiscount;
    } catch (err) {
      throw err;
    }
  }
  async deleteDiscount(id: string): Promise<discount> {
    try {
      const getDiscount = await this.getDiscountById(id);
      if (!getDiscount) {
        throw new appError("Record Not Found in Discount", 400);
      }
      const deleteDiscount = await discountModel.findByIdAndDelete(id);
      return deleteDiscount;
    } catch (err) {
      throw err;
    }
  }
}
