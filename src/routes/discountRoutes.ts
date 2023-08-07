import express from "express";
import DiscountController from "../controllers/discountController";
import { iocContainer as Container } from "../config/container";
import { IDiscountService } from "../interfaces/IDiscountService";
import { types } from "../config/types";

const discountService = Container.get<IDiscountService>(types.IDiscountService);
const discountController = new DiscountController(discountService);

const discountRouter = express.Router();

discountRouter.post("/creatediscount", (req, res, next) =>
  discountController.addDiscount(req, res, next)
);
discountRouter.get("/getdiscount/:id", (req, res, next) =>
  discountController.getDiscountById(req, res, next)
);
discountRouter.get("/getdiscounts", (req, res, next) =>
  discountController.getDiscounts(req, res, next)
);
discountRouter.put("/updatediscount/:id", (req, res, next) =>
  discountController.updateDiscount(req, res, next)
);
discountRouter.delete("/deletediscount/:id", (req, res, next) =>
  discountController.deleteDiscount(req, res, next)
);

export default discountRouter;
