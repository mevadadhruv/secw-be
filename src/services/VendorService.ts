import { inject, injectable } from "inversify";
import { IVendorService } from "../interfaces/IVendorService";
import { Vendor, GetVendor,DocumentType } from "../types/userTypes";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { types } from "../config/types";

@injectable()
export default class VendorService implements IVendorService{
private _vendorRepository : IVendorRepository;
    
    constructor(@inject(types.IVendorRepository) vendorRepository : IVendorRepository){
        this._vendorRepository = vendorRepository;
    }

    async addVendor(vendor: Vendor): Promise<GetVendor> {
        try{
            const createVendor = await this._vendorRepository.addVendor(vendor);
            return createVendor;
        }
        catch(err){
            throw err;
        }
    }
    
    async getVendors() {
        try{
            const getAllVendors = await this._vendorRepository.getVendors();
            return getAllVendors;
        }
        catch(err){
            throw err;
        }
    }
    
    async getVendorById(id: string): Promise<GetVendor> {
        try{
            const getVendor = await this._vendorRepository.getVendorById(id);
            return getVendor;
        }
        catch(err){
            throw err;
        }
    }
    
    async updateVendor(id: string, vendor: Vendor): Promise<GetVendor> {
        try{
            const updateVendor = await this._vendorRepository.updateVendor(id,vendor);
            return updateVendor;
        }
        catch(err){
            throw err;
        }
    }
    
    async deleteVendor(id: string): Promise<GetVendor> {
        try{
            const DeleteVendor = await this._vendorRepository.deleteVendor(id);
            return DeleteVendor;
        }
        catch(err){
            throw err;
        }
    }

}