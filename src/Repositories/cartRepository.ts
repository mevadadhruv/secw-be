import cartModel from "../models/cart.model";
import { cart, createUpdateCartInput } from "../types/userTypes";
import { ICartRepository } from "../interfaces/ICartRepository";
import { injectable, inject } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
import UserRepository from "./userRepository";
import ProductRepository from "./productRepository";
import { types } from "../config/types";
const mongooseTypes = mongoose.Types;
@injectable()
export default class CartRepository implements ICartRepository {
  _userRepo: UserRepository;
  _productRepo: ProductRepository;
  constructor(
    @inject(types.IUserRepository) userRepo: UserRepository,
    @inject(types.IProductRepository) productRepo: ProductRepository
  ) {
    this._userRepo = userRepo;
    this._productRepo = productRepo;
  }
  async addCart(input: createUpdateCartInput): Promise<cart> {
    try {
      if (
        String(input.userId).trim() === "" ||
        String(input.productId).trim() === ""
      ) {
        throw new appError("Please provide all details again!", 400);
      }

      const getUser = await this._userRepo.getUserbyId(String(input.userId));
      const getproduct = await this._productRepo.getProductById(
        String(input.productId)
      );
      if (!getUser || !getproduct) {
        throw new appError("Something went wrong, Please Try Again!", 400);
      }

      const addCart: cart = await cartModel.create({
        productId: input.productId,
        userId: input.userId,
        quantity: input.quantity ? input.quantity : 1,
        createdAt: new Date(),
      });
      return addCart;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(id: string): Promise<cart> {
    try {
      const getCart = await cartModel.findById(id);
      return getCart;
    } catch (err) {
      throw err;
    }
  }
  async getCarts(): Promise<cart[]> {
    try {
      const getCarts = await cartModel.find();
      return getCarts;
    } catch (err) {
      throw err;
    }
  }
  async updateCart(id: string, input: createUpdateCartInput): Promise<cart> {
    try {
      const getCart = await this.getCartById(id);
      if (!getCart) {
        throw new appError("Record Not Found in Cart", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateCart = await cartModel.findByIdAndUpdate(
        { _id },
        {
          productId: getCart.productId,
          userId: getCart.userId,
          quantity: input.quantity,
          updatedAt: new Date(),
        }
      );
      return updateCart;
    } catch (err) {
      throw err;
    }
  }
  async deleteCart(id: string): Promise<cart> {
    try {
      const getCart = await this.getCartById(id);
      if (!getCart) {
        throw new appError("Record Not Found in Cart", 400);
      }
      const deleteCart = await cartModel.findByIdAndDelete(id);
      return deleteCart;
    } catch (err) {
      throw err;
    }
  }
}
