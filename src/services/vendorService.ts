import { inject, injectable } from "inversify";
import { IVendorService } from "../interfaces/IVendorService";
import { vendor, getVendor,documentType } from "../types/userTypes";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { types } from "../config/types";

@injectable()
export default class VendorService implements IVendorService{
private _vendorRepository : IVendorRepository;
    
    constructor(@inject(types.IVendorRepository) vendorRepository : IVendorRepository){
        this._vendorRepository = vendorRepository;
    }

    async addVendor(vendor: vendor): Promise<getVendor> {
        try{
            const createVendor = await this._vendorRepository.addVendor(vendor);
            return createVendor;
        }
        catch(err){
            console.log("inside service add vendor", err);
            throw new Error("inside service add vendor" + err);
        }
    }
    
    async getVendors() {
        try{
            const getAllVendors = await this._vendorRepository.getVendors();
            return getAllVendors;
        }
        catch(err){
            console.log("inside service get vendors", err);
            throw new Error("inside service get vendors" + err);
        }
    }
    
    async getVendorById(id: string): Promise<getVendor> {
        try{
            const getVendor = await this._vendorRepository.getVendorById(id);
            return getVendor;
        }
        catch(err){
            console.log("inside service get vendor by id", err);
            throw new Error("inside service get vendor by id" + err);
        }
    }
    
    async updateVendor(id: string, vendor: vendor): Promise<getVendor> {
        try{
            const updateVendor = await this._vendorRepository.updateVendor(id,vendor);
            return updateVendor;
        }
        catch(err){
            console.log("inside service update vendor", err);
            throw new Error("inside service update vendor" + err);
        }
    }
    
    async deleteVendor(id: string): Promise<getVendor> {
        try{
            const DeleteVendor = await this._vendorRepository.deleteVendor(id);
            return DeleteVendor;
        }
        catch(err){
            console.log("inside service delete vendor", err);
            throw new Error("inside service delete vendor" + err);
        }
    }

}