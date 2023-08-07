import { createUpdateOrderInput, order } from "../types/userTypes";

export interface IOrderService {
  addOrder(input: createUpdateOrderInput): Promise<order>;
  getOrderById(id: string): Promise<order>;
  getOrders(): Promise<order[]>;
  updateOrder(id: string, input: createUpdateOrderInput): Promise<order>;
  deleteOrder(id: string): Promise<order>;
}
