import { category } from "../types/userTypes";

export interface ICategoryService {
  addCategory(name: string): Promise<category>;
  getCategoryById(id: string): Promise<category>;
  getCategories(): Promise<category[]>;
  updateCategory(id: string, name: string): Promise<category>;
  deleteCategory(id: string): Promise<category>;
}
