import { cart, createUpdateCartInput } from "../types/userTypes";
export interface ICartRepository {
  addCart(input: createUpdateCartInput): Promise<cart>;
  getCartById(id: string): Promise<cart>;
  getCarts(): Promise<cart[]>;
  updateCart(id: string, input: createUpdateCartInput): Promise<cart>;
  deleteCart(id: string): Promise<cart>;
}
