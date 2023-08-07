import { inject, injectable } from "inversify";
import { IOrderService } from "../interfaces/IOrderService";
import { createUpdateOrderInput, order } from "../types/userTypes";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { types } from "../config/types";

@injectable()
export default class OrderService implements IOrderService {
  private _orderRepository: IOrderRepository;

  constructor(
    @inject(types.IOrderRepository) orderRepository: IOrderRepository
  ) {
    this._orderRepository = orderRepository;
  }

  async addOrder(input: createUpdateOrderInput): Promise<order> {
    try {
      const addOrder = await this._orderRepository.addOrder(input);
      return addOrder;
    } catch (err) {
      throw new Error(
        "internal server error in the add order service. :- " + err
      );
    }
  }

  async getOrderById(id: string): Promise<order> {
    try {
      const getOrder = this._orderRepository.getOrderById(id);
      return getOrder;
    } catch (err) {
      throw new Error("internal server error in the order service. :- " + err);
    }
  }

  async getOrders(): Promise<order[]> {
    try {
      const getOrders = this._orderRepository.getOrders();
      return getOrders;
    } catch (err) {
      throw new Error("internal server error in the orders service. :- " + err);
    }
  }

  async updateOrder(id: string, input: createUpdateOrderInput): Promise<order> {
    try {
      const UpdateOrder = await this._orderRepository.updateOrder(id, input);
      return UpdateOrder;
    } catch (err) {
      throw new Error(
        "internal server error in the update order service. :- " + err
      );
    }
  }

  async deleteOrder(id: string): Promise<order> {
    try {
      const deleteOrder = await this._orderRepository.deleteOrder(id);
      return deleteOrder;
    } catch (err) {
      throw new Error(
        "internal server error in the delete order service. :- " + err
      );
    }
  }
}
