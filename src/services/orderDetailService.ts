import { inject, injectable } from "inversify";
import { IOrderDetailService } from "../interfaces/IOrderDetailService";
import { createUpdateOrderDetailInput, orderDetail } from "../types/userTypes";
import { IOrderDetailRepository } from "../interfaces/IOrderDetailRepository";
import { types } from "../config/types";

@injectable()
export default class OrderDetailService implements IOrderDetailService {
  private _orderDetailRepository: IOrderDetailRepository;

  constructor(
    @inject(types.IOrderDetailRepository)
    orderDetailRepository: IOrderDetailRepository
  ) {
    this._orderDetailRepository = orderDetailRepository;
  }

  async addOrderDetail(
    input: createUpdateOrderDetailInput
  ): Promise<orderDetail> {
    try {
      const addOrderDetail = await this._orderDetailRepository.addOrderDetail(
        input
      );
      return addOrderDetail;
    } catch (err) {
      throw new Error(
        "internal server error in the add order detail service. :- " + err
      );
    }
  }

  async getOrderDetailById(id: string): Promise<orderDetail> {
    try {
      const getOrderDetail = this._orderDetailRepository.getOrderDetailById(id);
      return getOrderDetail;
    } catch (err) {
      throw new Error(
        "internal server error in the order detail service. :- " + err
      );
    }
  }

  async getOrderDetails(): Promise<orderDetail[]> {
    try {
      const getOrderDetails = this._orderDetailRepository.getOrderDetails();
      return getOrderDetails;
    } catch (err) {
      throw new Error(
        "internal server error in the order details service. :- " + err
      );
    }
  }

  async updateOrderDetail(
    id: string,
    input: createUpdateOrderDetailInput
  ): Promise<orderDetail> {
    try {
      const UpdateOrderDetail =
        await this._orderDetailRepository.updateOrderDetail(id, input);
      return UpdateOrderDetail;
    } catch (err) {
      throw new Error(
        "internal server error in the update order detail service. :- " + err
      );
    }
  }

  async deleteOrderDetail(id: string): Promise<orderDetail> {
    try {
      const deleteOrderDetail =
        await this._orderDetailRepository.deleteOrderDetail(id);
      return deleteOrderDetail;
    } catch (err) {
      throw new Error(
        "internal server error in the delete order detail service. :- " + err
      );
    }
  }
}
