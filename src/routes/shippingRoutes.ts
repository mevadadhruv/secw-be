import express from "express";
import ShippingController from "../controllers/shippingController";
import { iocContainer as Container } from "../config/container";
import { IShippingService } from "../interfaces/IShippingService";
import { types } from "../config/types";

const shippingService = Container.get<IShippingService>(types.IShippingService);
const shippingController = new ShippingController(shippingService);

const shippingRouter = express.Router();

shippingRouter.post("/createshipping", (req, res, next) =>
  shippingController.addShipping(req, res, next)
);
shippingRouter.get("/getshipping/:id", (req, res, next) =>
  shippingController.getShippingById(req, res, next)
);
shippingRouter.get("/getshippings", (req, res, next) =>
  shippingController.getShippings(req, res, next)
);
shippingRouter.put("/updateshipping/:id", (req, res, next) =>
  shippingController.updateShipping(req, res, next)
);
shippingRouter.delete("/deleteshipping/:id", (req, res, next) =>
  shippingController.deleteShipping(req, res, next)
);

export default shippingRouter;
