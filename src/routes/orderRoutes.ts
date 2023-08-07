import express from "express";
import OrderController from "../controllers/orderController";
import { iocContainer as Container } from "../config/container";
import { IOrderService } from "../interfaces/IOrderService";
import { types } from "../config/types";

const orderService = Container.get<IOrderService>(types.IOrderService);
const orderController = new OrderController(orderService);

const orderRouter = express.Router();

orderRouter.post("/createorder", (req, res, next) =>
  orderController.addOrder(req, res, next)
);
orderRouter.get("/getorder/:id", (req, res, next) =>
  orderController.getOrderById(req, res, next)
);
orderRouter.get("/getorders", (req, res, next) =>
  orderController.getOrders(req, res, next)
);
orderRouter.put("/updateorder/:id", (req, res, next) =>
  orderController.updateOrder(req, res, next)
);
orderRouter.delete("/deleteorder/:id", (req, res, next) =>
  orderController.deleteOrder(req, res, next)
);

export default orderRouter;
