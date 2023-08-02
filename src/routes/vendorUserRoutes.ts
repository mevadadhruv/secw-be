import express from "express";
import VendorUserController from "../controllers/vendorUserController";
import { iocContainer as Container } from "../config/container";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import { types } from "../config/types";

const vendorService = Container.get<IVendorUserService>(
  types.IVendorUserService
);
const vendorUser = new VendorUserController(vendorService);

const vendorUserRouter = express.Router();

vendorUserRouter.post("/add", (req, res, next) =>
  vendorUser.addVendorUser(req, res, next)
);
vendorUserRouter.get("/vendorusers", (req, res, next) =>
  vendorUser.getVendorUsers(req, res, next)
);
vendorUserRouter.get("/vendorusers/:id", (req, res, next) =>
  vendorUser.getVendorUserById(req, res, next)
);
vendorUserRouter.delete("/delete/:id", (req, res, next) =>
  vendorUser.deleteVendorUser(req, res, next)
);

export default vendorUserRouter;
