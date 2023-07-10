import { inject, injectable } from "inversify";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { Vendor, GetVendor,DocumentType } from "../types/userTypes";
import vendorModel from "../models/vendor.model";
import { IDocumentService } from "../interfaces/IDocumentService";
import { types } from "../config/types";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { ObjectId } from "mongodb";

@injectable()
export default class VendorRepository implements IVendorRepository{
private _document : IDocumentService;

    constructor(@inject(types.IDocumentRepository) documentRepository : IDocumentRepository){
        this._document = documentRepository;
    }

    async addVendor(vendor: Vendor): Promise<GetVendor>{
        try{
            const name = vendor.name;
            const logo = vendor.logo;
            const addVendor = await vendorModel.create({name:name,logo:logo});
            return {name:addVendor.name,logo:addVendor.logo};
        }   
        catch(err){
            throw err;
        } 
    }
    
    async getVendors() {
        try{
            const getAllVendors = await vendorModel.find();
            console.log(getAllVendors);
            return getAllVendors;
        }
        catch(err){
            throw err;
        }
    }
    
    async getVendorById(id: string): Promise<GetVendor> {
        try{
            const getVendor = await vendorModel.findById(new ObjectId(id));
            console.log(getVendor);
            console.log(getVendor.name);
            console.log(getVendor.logo);
            return {id:getVendor.id, name:getVendor.name,logo:getVendor.logo};
        }
        catch(err){
            console.log("vendor repository");
            throw err;
        }
    }
    
    async updateVendor(id: string, vendor: Vendor): Promise<GetVendor> {
        try{
            const updateVendor = await vendorModel.findByIdAndUpdate(id,vendor);
            return {name : updateVendor.name,logo:updateVendor.logo};
        }
        catch(err){
            throw err;
        }
    }
    
    async deleteVendor(id: string): Promise<GetVendor> {
        try{
            const deleteVendor = await vendorModel.findByIdAndDelete(id);
            return {name : deleteVendor.name,logo:deleteVendor.logo};
        }
        catch(err){
            throw err;
        }
    }

}