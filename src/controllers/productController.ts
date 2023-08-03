import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { IProductService } from "../interfaces/IProductService";
import { types } from "../config/types";
import document from "../config/document";
import appError from "../error/appError";
import { documentType } from "../types/userTypes";

@injectable()
export default class ProductController {
  private _productService: IProductService;
  constructor(@inject(types.IProductService) productService: IProductService) {
    this._productService = productService;
  }
  async addProduct(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const uplodImage = document("dhruv-images").single("Attachment");
      console.log("test");
      uplodImage(req, res, async (err: any) => {
        if (err) {
          return new appError("Image not found", 301);
        }
        const documentFile: any = req.file;
        const documentName = documentFile.originalname;
        const documentDescription = documentFile.encoding;
        const documentAttachment = documentFile.location;
        const documentExtension = documentFile.mimetype;
        const documentSize = documentFile.size;
        const documentType: documentType = {
          name: documentName,
          description: documentDescription,
          attachment: documentAttachment,
          extension: documentExtension,
          size: documentSize,
        };
        const productType = {
          prodName: req.body.prodName,
          prodPrice: req.body.prodPrice,
          categoryId: req.body.categoryId,
        };
        const addProduct = await this._productService.addProduct(
          productType,
          documentType
        );
        return res
          .status(200)
          .json({ message: "successfully created product" });
      });
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async getProductById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getProducts = await this._productService.getProductById(
        req.params.id
      );
      if (getProducts) {
        return message.sendResponse(
          200,
          "successfully get product",
          getProducts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async getProducts(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getProducts = await this._productService.getProducts();
      if (getProducts) {
        return message.sendResponse(
          200,
          "successfully get products",
          getProducts,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateProduct(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const productType = {
        id: req.body.id,
        prodName: req.body.prodName,
        prodPrice: req.body.prodPrice,
        categoryId: req.body.categoryId,
      };
      const updatedProduct = await this._productService.updateProduct(
        productType.id,
        productType
      );
      if (updatedProduct) {
        return message.sendResponse(
          200,
          "successfully updated product",
          updatedProduct,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async deleteProduct(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteProduct = await this._productService.deleteProduct(
        req.params.id
      );
      if (deleteProduct) {
        return message.sendResponseDelete(
          200,
          "successfully deleted product!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
