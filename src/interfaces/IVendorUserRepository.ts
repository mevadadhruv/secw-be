export interface IVendorUserRepository {
  addVendorUser(vendorId: string, userId: string): any;
  getVendorUsers(): any;
  getVendorUserbyId(id: string): any;
  deleteVendorUser(id: string): any;
}
