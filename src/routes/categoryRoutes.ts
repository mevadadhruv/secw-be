import express from "express";
import CategoryController from "../controllers/categoryController";
import { iocContainer as Container } from "../config/container";
import { ICategoryService } from "../interfaces/ICategoryService";
import { types } from "../config/types";

const categoryService = Container.get<ICategoryService>(types.ICategoryService);
const categoryController = new CategoryController(categoryService);

const categoryRouter = express.Router();

categoryRouter.post("/createcategory", (req, res, next) =>
  categoryController.addCategory(req, res, next)
);
categoryRouter.get("/getcategory/:id", (req, res, next) =>
  categoryController.getCategoryById(req, res, next)
);
categoryRouter.get("/getcategories", (req, res, next) =>
  categoryController.getCategories(req, res, next)
);
categoryRouter.put("/updatecategory/", (req, res, next) =>
  categoryController.updateCategory(req, res, next)
);
categoryRouter.delete("/deletecategory/:id", (req, res, next) =>
  categoryController.deleteCategory(req, res, next)
);

export default categoryRouter;
