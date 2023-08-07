import { inject, injectable } from "inversify";
import { IDiscountService } from "../interfaces/IDiscountService";
import { createUpdateDiscountInput, discount } from "../types/userTypes";
import { IDiscountRepository } from "../interfaces/IDiscountRepository";
import { types } from "../config/types";

@injectable()
export default class DiscountService implements IDiscountService {
  private _discountRepository: IDiscountRepository;

  constructor(
    @inject(types.IDiscountRepository) discountRepository: IDiscountRepository
  ) {
    this._discountRepository = discountRepository;
  }

  async addDiscount(input: createUpdateDiscountInput): Promise<discount> {
    try {
      const addDiscount = await this._discountRepository.addDiscount(input);
      return addDiscount;
    } catch (err) {
      throw new Error(
        "internal server error in the add discount service. :- " + err
      );
    }
  }

  async getDiscountById(id: string): Promise<discount> {
    try {
      const getDiscount = this._discountRepository.getDiscountById(id);
      return getDiscount;
    } catch (err) {
      throw new Error(
        "internal server error in the discount service. :- " + err
      );
    }
  }

  async getDiscounts(): Promise<discount[]> {
    try {
      const getDiscounts = this._discountRepository.getDiscounts();
      return getDiscounts;
    } catch (err) {
      throw new Error(
        "internal server error in the discounts service. :- " + err
      );
    }
  }

  async updateDiscount(
    id: string,
    input: createUpdateDiscountInput
  ): Promise<discount> {
    try {
      const UpdateDiscount = await this._discountRepository.updateDiscount(
        id,
        input
      );
      return UpdateDiscount;
    } catch (err) {
      throw new Error(
        "internal server error in the update discount service. :- " + err
      );
    }
  }

  async deleteDiscount(id: string): Promise<discount> {
    try {
      const deleteDiscount = await this._discountRepository.deleteDiscount(id);
      return deleteDiscount;
    } catch (err) {
      throw new Error(
        "internal server error in the delete discount service. :- " + err
      );
    }
  }
}
