import express from "express";
import VendorUserController from "../controllers/VendorUserController";
import { iocContainer as Container } from "../config/container";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { types } from "../config/types";

const vendorService = Container.get<IVendorUserService>(types.IVendorUserService);
const vendorUser = new VendorUserController(vendorService);

const VendorUserRouter = express.Router();

VendorUserRouter.post("/add",(req,res,next)=>vendorUser.addVendorUser(req,res,next));
VendorUserRouter.get("/vendorusers",(req,res,next)=>vendorUser.getVendorUser(req,res,next));
VendorUserRouter.get("/vendorusers/:id",(req,res,next)=>vendorUser.getById(req,res,next));
VendorUserRouter.delete("/delete/:id",(req,res,next)=>vendorUser.deleteVendorUser(req,res,next));

export default VendorUserRouter;