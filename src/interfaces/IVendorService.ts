import { GetVendor, Vendor, DocumentType } from "../types/userTypes";

export interface IVendorService{
    addVendor(vendor:Vendor):Promise<GetVendor>;
    getVendors():any;
    getVendorById(id:string):Promise<GetVendor>;
    updateVendor(id:string,vendor:Vendor):Promise<GetVendor>;
    deleteVendor(id:string):Promise<GetVendor>;
}