import { Vendor, CreateUser } from "../types/userTypes";

export interface IVendorUserRepository {
  addVendorUser(vendorId: string, userId: string): any;
  getVendorUser(): any;
  getVendorUserbyId(id: string): any;
  deleteVendorUser(id: string): any;
}
