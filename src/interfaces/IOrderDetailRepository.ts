import { createUpdateOrderDetailInput, orderDetail } from "../types/userTypes";

export interface IOrderDetailRepository {
  addOrderDetail(input: createUpdateOrderDetailInput): Promise<orderDetail>;
  getOrderDetailById(id: string): Promise<orderDetail>;
  getOrderDetails(): Promise<orderDetail[]>;
  updateOrderDetail(
    id: string,
    input: createUpdateOrderDetailInput
  ): Promise<orderDetail>;
  deleteOrderDetail(id: string): Promise<orderDetail>;
}
