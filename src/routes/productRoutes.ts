import express from "express";
import ProductController from "../controllers/productController";
import { iocContainer as Container } from "../config/container";
import { IProductService } from "../interfaces/IProductService";
import { types } from "../config/types";

const productService = Container.get<IProductService>(types.IProductService);
const productController = new ProductController(productService);

const productRouter = express.Router();

productRouter.post("/createproduct", (req, res, next) =>
  productController.addProduct(req, res, next)
);
productRouter.get("/getproduct/:id", (req, res, next) =>
  productController.getProductById(req, res, next)
);
productRouter.get("/getproducts", (req, res, next) =>
  productController.getProducts(req, res, next)
);
productRouter.put("/updateproduct/", (req, res, next) =>
  productController.updateProduct(req, res, next)
);
productRouter.delete("/deleteproduct/:id", (req, res, next) =>
  productController.deleteProduct(req, res, next)
);

export default productRouter;
