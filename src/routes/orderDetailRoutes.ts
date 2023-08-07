import express from "express";
import OrderDetailController from "../controllers/orderDetailController";
import { iocContainer as Container } from "../config/container";
import { IOrderDetailService } from "../interfaces/IOrderDetailService";
import { types } from "../config/types";

const orderDetailService = Container.get<IOrderDetailService>(
  types.IOrderDetailService
);
const orderDetailController = new OrderDetailController(orderDetailService);

const orderDetailRouter = express.Router();

orderDetailRouter.post("/createorderDetail", (req, res, next) =>
  orderDetailController.addOrderDetail(req, res, next)
);
orderDetailRouter.get("/getorderDetail/:id", (req, res, next) =>
  orderDetailController.getOrderDetailById(req, res, next)
);
orderDetailRouter.get("/getorderDetails", (req, res, next) =>
  orderDetailController.getOrderDetails(req, res, next)
);
orderDetailRouter.put("/updateorderDetail/:id", (req, res, next) =>
  orderDetailController.updateOrderDetail(req, res, next)
);
orderDetailRouter.delete("/deleteorderDetail/:id", (req, res, next) =>
  orderDetailController.deleteOrderDetail(req, res, next)
);

export default orderDetailRouter;
