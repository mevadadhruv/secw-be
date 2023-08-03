import { documentType, product } from "../types/userTypes";
export interface IProductRepository {
  addProduct(product: product, documentType: documentType): Promise<product>;
  getProductById(id: string): Promise<product>;
  getProducts(): Promise<product[]>;
  updateProduct(id: string, product: product): Promise<product>;
  deleteProduct(id: string): Promise<product>;
}
