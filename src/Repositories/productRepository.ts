import productModel from "../models/product.model";
import { documentType, product } from "../types/userTypes";
import { IProductRepository } from "../interfaces/IProductRepository";
import { inject, injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { types } from "../config/types";
const mongooseTypes = mongoose.Types;
@injectable()
export default class ProductRepository implements IProductRepository {
  private _documentRepository: IDocumentRepository;
  constructor(
    @inject(types.IDocumentRepository) documentRepo: IDocumentRepository
  ) {
    this._documentRepository = documentRepo;
  }

  async addProduct(
    _product: product,
    document: documentType
  ): Promise<product> {
    try {
      const documentRegister = await this._documentRepository.addDocument(
        document
      );
      console.log("document register", documentRegister);
      const documentId = documentRegister.id;
      const addProduct = await productModel.create({
        prodName: _product.prodName,
        prodPrice: _product.prodPrice,
        categoryId: _product.categoryId
          ? new ObjectId(_product.categoryId)
          : null,
        documentId: documentId ? new ObjectId(documentId) : null,
      });
      console.log("addProduct; register", addProduct);

      return addProduct;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id: string): Promise<product> {
    try {
      const getProduct = await productModel.findById(id);
      return getProduct;
    } catch (err) {
      throw err;
    }
  }

  async getProducts(): Promise<product[]> {
    try {
      const getProducts = await productModel.find();
      return getProducts;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(id: string, _product: product): Promise<product> {
    try {
      const getProduct = await this.getProductById(id);
      if (!getProduct) {
        throw new appError("Record Not Found in Product", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateProduct = await productModel.findByIdAndUpdate(
        { _id },
        {
          prodName: _product.prodName,
          prodPrice: _product.prodPrice,
          categoryId: _product.categoryId
            ? new ObjectId(_product.categoryId)
            : getProduct.categoryId,
          // documentId: _product.categoryId
          //   ? new ObjectId(_product.documentId)
          //   : null,
        }
      );
      return updateProduct;
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id: string): Promise<product> {
    try {
      const getProduct = await this.getProductById(id);
      if (!getProduct) {
        throw new appError("Record Not Found in Product", 400);
      }
      const deleteProduct = await productModel.findByIdAndDelete(id);
      return deleteProduct;
    } catch (err) {
      throw err;
    }
  }
}
