import { inject, injectable } from "inversify";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { types } from "../config/types";

@injectable()
export default class VendorUserService implements IVendorUserService {
  private _vendorUserRepo: IVendorUserRepository;

  constructor(
    @inject(types.IVendorUserRepository) vendorUserRepo: IVendorUserRepository
  ) {
    this._vendorUserRepo = vendorUserRepo;
  }

  async getVendorUserbyId(id: string) {
    try {
      const findVendorUser = await this._vendorUserRepo.getVendorUserbyId(id);
      return findVendorUser;
    } catch (err) {
      throw new Error(
        "internal server error in the vendor user service. :- " + err
      );
    }
  }

  async addVendorUser(vendor: string, user: string) {
    try {
      const vendorUserId = await this._vendorUserRepo.addVendorUser(
        vendor,
        user
      );
      return vendorUserId;
    } catch (err) {
      throw new Error(
        "internal server error in the add vendor user service. :- " + err
      );
    }
  }

  async getVendorUsers() {
    try {
      const findVendorUser = await this._vendorUserRepo.getVendorUsers();
      return findVendorUser;
    } catch (err) {
      throw new Error(
        "internal server error in the vendor users service. :- " + err
      );
    }
  }

  async deleteVendorUser(id: string) {
    try {
      const deleteVenUser = await this._vendorUserRepo.deleteVendorUser(id);
      return deleteVenUser;
    } catch (err) {
      throw new Error(
        "internal server error in the delete vendor user service. :- " + err
      );
    }
  }
}
