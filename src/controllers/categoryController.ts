import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { ICategoryService } from "../interfaces/ICategoryService";
import { types } from "../config/types";

@injectable()
export default class CategoryController {
  private _categoryService: ICategoryService;
  constructor(
    @inject(types.ICategoryService) categoryService: ICategoryService
  ) {
    this._categoryService = categoryService;
  }
  async addCategory(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const addCategory = await this._categoryService.addCategory(req.body);
      if (addCategory) {
        return message.sendResponse(
          200,
          "successfully created category",
          addCategory,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCategoryById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getCategorys = await this._categoryService.getCategoryById(
        req.params.id
      );
      if (getCategorys) {
        return message.sendResponse(
          200,
          "successfully get category",
          getCategorys,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCategories(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getCategories = await this._categoryService.getCategories();
      if (getCategories) {
        return message.sendResponse(
          200,
          "successfully get categorys",
          getCategories,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateCategory(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updatedCategory = await this._categoryService.updateCategory(
        req.body.id,
        req.body.name
      );
      if (updatedCategory) {
        return message.sendResponse(
          200,
          "successfully updated category",
          updatedCategory,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteCategory(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteCategory = await this._categoryService.deleteCategory(
        req.params.id
      );
      if (deleteCategory) {
        return message.sendResponseDelete(
          200,
          "successfully deleted category!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
