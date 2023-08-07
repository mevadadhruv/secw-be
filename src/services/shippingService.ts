import { inject, injectable } from "inversify";
import { IShippingService } from "../interfaces/IShippingService";
import { createUpdateShippingInput, shipping } from "../types/userTypes";
import { IShippingRepository } from "../interfaces/IShippingRepository";
import { types } from "../config/types";

@injectable()
export default class ShippingService implements IShippingService {
  private _shippingRepository: IShippingRepository;

  constructor(
    @inject(types.IShippingRepository) shippingRepository: IShippingRepository
  ) {
    this._shippingRepository = shippingRepository;
  }

  async addShipping(input: createUpdateShippingInput): Promise<shipping> {
    try {
      const addShipping = await this._shippingRepository.addShipping(input);
      return addShipping;
    } catch (err) {
      throw new Error(
        "internal server error in the add shipping service. :- " + err
      );
    }
  }

  async getShippingById(id: string): Promise<shipping> {
    try {
      const getShipping = this._shippingRepository.getShippingById(id);
      return getShipping;
    } catch (err) {
      throw new Error(
        "internal server error in the shipping service. :- " + err
      );
    }
  }

  async getShippings(): Promise<shipping[]> {
    try {
      const getShippings = this._shippingRepository.getShippings();
      return getShippings;
    } catch (err) {
      throw new Error(
        "internal server error in the shippings service. :- " + err
      );
    }
  }

  async updateShipping(
    id: string,
    input: createUpdateShippingInput
  ): Promise<shipping> {
    try {
      const UpdateShipping = await this._shippingRepository.updateShipping(
        id,
        input
      );
      return UpdateShipping;
    } catch (err) {
      throw new Error(
        "internal server error in the update shipping service. :- " + err
      );
    }
  }

  async deleteShipping(id: string): Promise<shipping> {
    try {
      const deleteShipping = await this._shippingRepository.deleteShipping(id);
      return deleteShipping;
    } catch (err) {
      throw new Error(
        "internal server error in the delete shipping service. :- " + err
      );
    }
  }
}
