import { inject, injectable } from "inversify";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";
import VendorUserModel from "../models/vendorUser.model";

@injectable()
export default class VendorUserRepository implements IVendorUserRepository {
  private _vendorRepo: IVendorRepository;
  private _userRepo: IUserRepository;

  constructor(
    @inject(types.IVendorRepository) vendorRepo: IVendorRepository,
    @inject(types.IUserRepository) userRepo: IUserRepository
  ) {
    this._vendorRepo = vendorRepo;
    this._userRepo = userRepo;
  }

  async getVendorUserbyId(id: string) {
    try {
      const findVendorbyId = await VendorUserModel.findById(id);
      return findVendorbyId;
    } catch (err) {
      throw err;
    }
  }

  async addVendorUser(vendorId: string, userId: string) {
    try {
      const userRegister = await this._userRepo.getUserbyId(userId);
      const vendorRegister = await this._vendorRepo.getVendorById(vendorId);
      const addVendorUser = await VendorUserModel.create({
        userId: userRegister.id,
        VendorId: vendorRegister.id,
      });
      return addVendorUser;
    } catch (err) {
      throw err;
    }
  }

  async getVendorUsers() {
    try {
      const findVendorUser = await VendorUserModel.find();
      return findVendorUser;
    } catch (err) {
      throw err;
    }
  }

  async deleteVendorUser(id: string) {
    try {
      const deleteVendorUser = await VendorUserModel.findByIdAndDelete(id);
      return deleteVendorUser;
    } catch (err) {
      throw err;
    }
  }
}
