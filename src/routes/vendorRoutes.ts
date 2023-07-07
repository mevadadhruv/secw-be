import express from "express";
import VendorController from "../controllers/vendorController";
import { iocContainer as Container } from "../config/container";
import { IVendorService } from "../interfaces/IVendorService";
import { types } from "../config/types";

const VendorRouter = express.Router();

const vendorService = Container.get<IVendorService>(types.IVendorService);
const vendorController = new VendorController(vendorService);

VendorRouter.post("/create-vendor",(req,res,next)=>vendorController.addVendor(req,res,next));
VendorRouter.get("/vendor",(req,res,next)=>vendorController.getVendors(req,res,next));
VendorRouter.get("/vendor/:id",(req,res,next)=>vendorController.getVendorById(req,res,next));
VendorRouter.put("/vendor/:id",(req,res,next)=>vendorController.updateVendor(req,res,next));
VendorRouter.delete("/vendor/:id",(req,res,next)=>vendorController.deleteVendor(req,res,next));

export default VendorRouter;