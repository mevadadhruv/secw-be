import express from "express";
import VendorUserController from "../controllers/VendorUserController";
import { iocContainer as Container } from "../config/container";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { types } from "../config/types";

const vendorService = Container.get<IVendorUserService>(types.IVendorUserService);
const vendorUser = new VendorUserController(vendorService);

const VendorUserRouter = express.Router();

VendorUserRouter.post("/add",(req,res)=>vendorUser.addVendorUser(req,res));
VendorUserRouter.get("/vendorusers",(req,res)=>vendorUser.getVendorUser(req,res));
VendorUserRouter.get("/vendorusers/:id",(req,res)=>vendorUser.getById(req,res));
VendorUserRouter.delete("/delete/:id",(req,res)=>vendorUser.deleteVendorUser(req,res));

export default VendorUserRouter;