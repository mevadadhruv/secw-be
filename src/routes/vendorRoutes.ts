import express from "express";
import VendorController from "../controllers/vendorController";
import { iocContainer as Container } from "../config/container";
import { IVendorService } from "../interfaces/IVendorService";
import { types } from "../config/types";

const vendorRouter = express.Router();

const vendorService = Container.get<IVendorService>(types.IVendorService);
const vendorController = new VendorController(vendorService);

vendorRouter.post("/create-vendor", (req, res, next) =>
  vendorController.addVendor(req, res, next)
);
vendorRouter.get("/vendor", (req, res, next) =>
  vendorController.getVendors(req, res, next)
);
vendorRouter.get("/vendor/:id", (req, res, next) =>
  vendorController.getVendorById(req, res, next)
);
vendorRouter.put("/vendor/:id", (req, res, next) =>
  vendorController.updateVendor(req, res, next)
);
vendorRouter.delete("/vendor/:id", (req, res, next) =>
  vendorController.deleteVendor(req, res, next)
);

export default vendorRouter;
