import { inject, injectable } from "inversify";
import { IProductService } from "../interfaces/IProductService";
import { documentType, product } from "../types/userTypes";
import { IProductRepository } from "../interfaces/IProductRepository";
import { types } from "../config/types";

@injectable()
export default class ProductService implements IProductService {
  private _productRepository: IProductRepository;

  constructor(
    @inject(types.IProductRepository) productRepository: IProductRepository
  ) {
    this._productRepository = productRepository;
  }

  async addProduct(product: any, documentType: documentType): Promise<product> {
    try {
      const addProduct = await this._productRepository.addProduct(
        product,
        documentType
      );
      return addProduct;
    } catch (err) {
      throw new Error(
        "internal server error in the add product service. :- " + err
      );
    }
  }

  async getProductById(id: string): Promise<product> {
    try {
      const getProduct = this._productRepository.getProductById(id);
      return getProduct;
    } catch (err) {
      throw new Error(
        "internal server error in the product service. :- " + err
      );
    }
  }

  async getProducts(): Promise<product[]> {
    try {
      const getProducts = this._productRepository.getProducts();
      return getProducts;
    } catch (err) {
      throw new Error(
        "internal server error in the products service. :- " + err
      );
    }
  }

  async updateProduct(id: string, _product: product): Promise<product> {
    try {
      const updateProduct = await this._productRepository.updateProduct(
        id,
        _product
      );
      return updateProduct;
    } catch (err) {
      throw new Error(
        "internal server error in the update product service. :- " + err
      );
    }
  }

  async deleteProduct(id: string): Promise<product> {
    try {
      const deleteProduct = await this._productRepository.deleteProduct(id);
      return deleteProduct;
    } catch (err) {
      throw new Error(
        "internal server error in the delete product service. :- " + err
      );
    }
  }
}
