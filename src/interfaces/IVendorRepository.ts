import { getVendor, vendor , documentType} from "../types/userTypes";

export interface IVendorRepository{
    addVendor(vendor:vendor):Promise<getVendor>;
    getVendors():any;
    getVendorById(id:string):Promise<getVendor>;
    updateVendor(id:string,vendor:vendor):Promise<getVendor>;
    deleteVendor(id:string):Promise<getVendor>;
}