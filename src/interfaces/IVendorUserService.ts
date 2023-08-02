import { Vendor, createUser } from "../types/userTypes";

export interface IVendorUserService {
  addVendorUser(vendorId: string, userId: string): any;
  getVendorUsers(): any;
  getVendorUserbyId(id: string): any;
  deleteVendorUser(id: string): any;
}
