import { createUpdateShippingInput, shipping } from "../types/userTypes";

export interface IShippingRepository {
  addShipping(input: createUpdateShippingInput): Promise<shipping>;
  getShippingById(id: string): Promise<shipping>;
  getShippings(): Promise<shipping[]>;
  updateShipping(
    id: string,
    input: createUpdateShippingInput
  ): Promise<shipping>;
  deleteShipping(id: string): Promise<shipping>;
}
