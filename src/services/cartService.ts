import { inject, injectable } from "inversify";
import { ICartService } from "../interfaces/ICartService";
import { cart, createUpdateCartInput } from "../types/userTypes";
import { ICartRepository } from "../interfaces/ICartRepository";
import { types } from "../config/types";

@injectable()
export default class CartService implements ICartService {
  private _cartRepository: ICartRepository;

  constructor(@inject(types.ICartRepository) cartRepository: ICartRepository) {
    this._cartRepository = cartRepository;
  }

  async addCart(input: createUpdateCartInput): Promise<cart> {
    try {
      const addCart = await this._cartRepository.addCart(input);
      return addCart;
    } catch (err) {
      throw new Error(
        "internal server error in the add cart service. :- " + err
      );
    }
  }

  async getCartById(id: string): Promise<cart> {
    try {
      const getCart = this._cartRepository.getCartById(id);
      return getCart;
    } catch (err) {
      throw new Error("internal server error in the cart service. :- " + err);
    }
  }

  async getCarts(): Promise<cart[]> {
    try {
      const getCarts = this._cartRepository.getCarts();
      return getCarts;
    } catch (err) {
      throw new Error("internal server error in the carts service. :- " + err);
    }
  }

  async updateCart(id: string, input: createUpdateCartInput): Promise<cart> {
    try {
      const UpdateCart = await this._cartRepository.updateCart(id, input);
      return UpdateCart;
    } catch (err) {
      throw new Error(
        "internal server error in the update cart service. :- " + err
      );
    }
  }

  async deleteCart(id: string): Promise<cart> {
    try {
      const deleteCart = await this._cartRepository.deleteCart(id);
      return deleteCart;
    } catch (err) {
      throw new Error(
        "internal server error in the delete cart service. :- " + err
      );
    }
  }
}
