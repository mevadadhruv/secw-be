import { getVendor, Vendor, documentType } from "../types/userTypes";

export interface IVendorRepository {
  addVendor(vendor: Vendor): Promise<getVendor>;
  getVendors(): any;
  getVendorById(id: string): Promise<getVendor>;
  updateVendor(id: string, vendor: Vendor): Promise<getVendor>;
  deleteVendor(id: string): Promise<getVendor>;
}
