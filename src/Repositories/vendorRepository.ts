import { inject, injectable } from "inversify";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { Vendor, getVendor, documentType } from "../types/userTypes";
import vendorModel from "../models/vendor.model";
import { IDocumentService } from "../interfaces/IDocumentService";
import { types } from "../config/types";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { ObjectId } from "mongodb";

@injectable()
export default class VendorRepository implements IVendorRepository {
  private _document: IDocumentService;

  constructor(
    @inject(types.IDocumentRepository) documentRepository: IDocumentRepository
  ) {
    this._document = documentRepository;
  }

  async addVendor(vendor: Vendor, document: documentType): Promise<getVendor> {
    try {
      const name = vendor.name;
      const documentRegister = await this._document.addDocument(document);
      const addVendor = await vendorModel.create({
        name: name,
        logo: documentRegister.id,
      });
      return { name: addVendor.name };
    } catch (err) {
      throw err;
    }
  }

  async getVendors() {
    try {
      const getAllVendors = await vendorModel.find();
      if (!getAllVendors) {
        throw new Error("Record is not there!");
      }
      return getAllVendors;
    } catch (err) {
      throw err;
    }
  }

  async getVendorById(id: string): Promise<getVendor> {
    try {
      const getVendor = await vendorModel.findById(new ObjectId(id));
      return { id: getVendor.id, name: getVendor.name };
    } catch (err) {
      throw err;
    }
  }

  async updateVendor(id: string, vendor: Vendor): Promise<getVendor> {
    try {
      const updateVendor = await vendorModel.findByIdAndUpdate(id, vendor);
      return { name: updateVendor.name };
    } catch (err) {
      throw err;
    }
  }

  async deleteVendor(id: string): Promise<getVendor> {
    try {
      const deleteVendor = await vendorModel.findByIdAndDelete(id);
      return { name: deleteVendor.name };
    } catch (err) {
      throw err;
    }
  }
}
