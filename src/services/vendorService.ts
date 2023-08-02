import { inject, injectable } from "inversify";
import { IVendorService } from "../interfaces/IVendorService";
import { Vendor, getVendor, documentType } from "../types/userTypes";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { types } from "../config/types";

@injectable()
export default class VendorService implements IVendorService {
  private _vendorRepository: IVendorRepository;

  constructor(
    @inject(types.IVendorRepository) vendorRepository: IVendorRepository
  ) {
    this._vendorRepository = vendorRepository;
  }

  async addVendor(vendor: Vendor): Promise<getVendor> {
    try {
      const createVendor = await this._vendorRepository.addVendor(vendor);
      return createVendor;
    } catch (err) {
      throw new Error(
        "internal server error in the add vendor service. :- " + err
      );
    }
  }

  async getVendors() {
    try {
      const getAllVendors = await this._vendorRepository.getVendors();
      return getAllVendors;
    } catch (err) {
      throw new Error(
        "internal server error in the vendors service. :- " + err
      );
    }
  }

  async getVendorById(id: string): Promise<getVendor> {
    try {
      const getVendor = await this._vendorRepository.getVendorById(id);
      return getVendor;
    } catch (err) {
      throw new Error("internal server error in the vendor service. :- " + err);
    }
  }

  async updateVendor(id: string, vendor: Vendor): Promise<getVendor> {
    try {
      const updateVendor = await this._vendorRepository.updateVendor(
        id,
        vendor
      );
      return updateVendor;
    } catch (err) {
      throw new Error(
        "internal server error in the update vendor service. :- " + err
      );
    }
  }

  async deleteVendor(id: string): Promise<getVendor> {
    try {
      const deleteVendor = await this._vendorRepository.deleteVendor(id);
      return deleteVendor;
    } catch (err) {
      throw new Error(
        "internal server error in the delete vendor service. :- " + err
      );
    }
  }
}
