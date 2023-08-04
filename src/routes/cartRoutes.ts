import express from "express";
import CartController from "../controllers/cartController";
import { iocContainer as Container } from "../config/container";
import { ICartService } from "../interfaces/ICartService";
import { types } from "../config/types";

const cartService = Container.get<ICartService>(types.ICartService);
const cartController = new CartController(cartService);

const cartRouter = express.Router();

cartRouter.post("/createcart", (req, res, next) =>
  cartController.addCart(req, res, next)
);
cartRouter.get("/getcart/:id", (req, res, next) =>
  cartController.getCartById(req, res, next)
);
cartRouter.get("/getcarts", (req, res, next) =>
  cartController.getCarts(req, res, next)
);
cartRouter.put("/updatecart/", (req, res, next) =>
  cartController.updateCart(req, res, next)
);
cartRouter.delete("/deletecart/:id", (req, res, next) =>
  cartController.deleteCart(req, res, next)
);

export default cartRouter;
