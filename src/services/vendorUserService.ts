import { inject, injectable } from "inversify";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { types } from "../config/types";

@injectable()
export default class VendorUserService implements IVendorUserService{
private _vendorUserRepo : IVendorUserRepository;

    constructor(@inject(types.IVendorUserRepository) vendorUserRepo : IVendorUserRepository){
        this._vendorUserRepo = vendorUserRepo;
    }
    
    async getVendorUserbyId(id:string) {
        try{
            const findVendorUser = await this._vendorUserRepo.getVendorUserbyId(id);
            return findVendorUser;            
        }
        catch(err){
            console.log("inside service get vendoruser", err);
            throw new Error("inside service get vendoruser" + err);
        }
    }

    async addVendorUser(vendor: string, user: string)  {
        try{
            const vendorUserId = await this._vendorUserRepo.addVendorUser(vendor,user);
            return vendorUserId;
        }
        catch(err){
            console.log("inside service add vendoruser", err);
            throw new Error("inside service add vendoruser" + err);
        }
    }

    async getVendorUser() {
        try{
            const findVendorUser = await this._vendorUserRepo.getVendorUser();
            return findVendorUser;
        }
        catch(err){
            console.log("inside service get vendoruser", err);
            throw new Error("inside service get vendoruser" + err);
        }
    }

    async deleteVendorUser(id:string) {
        try{
            const deleteVenUser = await this._vendorUserRepo.deleteVendorUser(id);
            return deleteVenUser;
        }
        catch(err){
            console.log("inside service delete vendoruser", err);
            throw new Error("inside service delete vendoruser" + err);
        }
    }
}