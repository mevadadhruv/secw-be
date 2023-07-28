import express,{NextFunction} from "express";
import { inject, injectable } from "inversify";
import { IVendorService } from "../interfaces/IVendorService";
import { types } from "../config/types";
import { vendor } from "../types/userTypes";
import logo from "../config/document";
const message = require("../error/globalSuccessHandler");
import appError from "../Error/AppError";
import {checking,sendErrorProd} from "../Error/globalErrorHandler";

@injectable()
export default class VendorController{
private _vendorService : IVendorService;

    constructor(@inject(types.IVendorService) vendorService : IVendorService){
        this._vendorService = vendorService;
    }

    async addVendor(req:express.Request,res:express.Response,next:NextFunction){
        try{
            //console.log("name",req.body.name);
            const uploadImage = logo('dhruv-images').single("logo");
            uploadImage(req, res, async (err) => {
                if (err) {
                    return new appError("Image not found", 301);
                }
                const documentFile : any = req.file;
                //console.log(documentFile);
                const documentAttachment = documentFile.location;
                //console.log(documentAttachment);
                const vendor : vendor = {
                    name : req.body.name,
                    logo : documentAttachment
                };
                //console.log(vendor.name);
                const addVendor = await this._vendorService.addVendor(vendor);
                if(addVendor){
                    return message.sendResponse(200, "vendor created", addVendor, res);
                }
                else{
                    return new appError("something went very wrong",400);
                }
            })
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async getVendors(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const getvendors = await this._vendorService.getVendors();
            if(getvendors){
                return message.sendResponseGet(200,getvendors,res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async getVendorById(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const vendorId = req.params.id;
            const getVendorByID = await this._vendorService.getVendorById(vendorId);
            if(getVendorByID){
                return message.sendResponseGet(200,getVendorByID,res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async updateVendor(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const vendorId = req.params.id;
            const uploadImage = logo('dhruv-images').single("logo");
            uploadImage(req, res, async (err:any) => {
                if (err) {
                    return new appError("Image not found", 301);
                }
                const documentFile : any = req.file;
                //console.log(documentFile);
                const documentAttachment = documentFile.location;
                //console.log(documentAttachment);
                const vendor : vendor = {
                    name : req.body.name,
                    logo : documentAttachment
                };
                //console.log(vendor.name);
                const updateVendor = await this._vendorService.updateVendor(vendorId,vendor);
                if(updateVendor){
                    return message.sendResponse(200, "vendor updated", updateVendor, res);
                }
                else{
                    return new appError("something went very wrong",400);
                }
            })
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async deleteVendor(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const deleteId = req.params.id;
            const deletevendor = await this._vendorService.deleteVendor(deleteId);
            if(deletevendor){
                return message.sendResponseDelete(200,"deleted sucessfully!",res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }
}