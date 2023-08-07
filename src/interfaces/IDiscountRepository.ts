import { createUpdateDiscountInput, discount } from "../types/userTypes";

export interface IDiscountRepository {
  addDiscount(input: createUpdateDiscountInput): Promise<discount>;
  getDiscountById(id: string): Promise<discount>;
  getDiscounts(): Promise<discount[]>;
  updateDiscount(
    id: string,
    input: createUpdateDiscountInput
  ): Promise<discount>;
  deleteDiscount(id: string): Promise<discount>;
}
