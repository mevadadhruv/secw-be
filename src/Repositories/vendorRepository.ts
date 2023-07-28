import { inject, injectable } from "inversify";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import { vendor, getVendor,documentType } from "../types/userTypes";
import vendorModel from "../models/vendor.model";
import { types } from "../config/types";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { ObjectId } from "mongodb";

@injectable()
export default class VendorRepository implements IVendorRepository{
private _document : IDocumentRepository;

    constructor(@inject(types.IDocumentRepository) documentRepository : IDocumentRepository){
        this._document = documentRepository;
    }

    async addVendor(vendor: vendor): Promise<getVendor>{
        try{
            const name = vendor.name;
            const logo = vendor.logo;
            const addVendor = await vendorModel.create({name:name,logo:logo});
            return {name:addVendor.name,logo:addVendor.logo};
        }   
        catch(err){
            console.log("inside repository add vendor", err);
            throw new Error("inside repository add vendor" + err);
        } 
    }
    
    async getVendors() {
        try{
            const getAllVendors = await vendorModel.find();
            console.log(getAllVendors);
            return getAllVendors;
        }
        catch(err){
            console.log("inside repository get vendors", err);
            throw new Error("inside repository get vendors" + err);
        }
    }
    
    async getVendorById(id: string): Promise<getVendor> {
        try{
            const getVendor = await vendorModel.findById(new ObjectId(id));
            console.log(getVendor);
            console.log(getVendor.name);
            console.log(getVendor.logo);
            return {id:getVendor.id, name:getVendor.name,logo:getVendor.logo};
        }
        catch(err){
            console.log("inside repository get vendor", err);
            throw new Error("inside repository get vendor" + err);
        }
    }
    
    async updateVendor(id: string, vendor: vendor): Promise<getVendor> {
        try{
            const updateVendor = await vendorModel.findByIdAndUpdate(id,vendor);
            return {name : updateVendor.name,logo:updateVendor.logo};
        }
        catch(err){
            console.log("inside repository update vendor", err);
            throw new Error("inside repository update vendor" + err);
        }
    }
    
    async deleteVendor(id: string): Promise<getVendor> {
        try{
            const deleteVendor = await vendorModel.findByIdAndDelete(id);
            return {name : deleteVendor.name,logo:deleteVendor.logo};
        }
        catch(err){
            console.log("inside repository delete vendor", err);
            throw new Error("inside repository delete vendor" + err);
        }
    }

}