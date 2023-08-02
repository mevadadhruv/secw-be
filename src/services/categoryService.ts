import { inject, injectable } from "inversify";
import { ICategoryService } from "../interfaces/ICategoryService";
import { category } from "../types/userTypes";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { types } from "../config/types";

@injectable()
export default class CategoryService implements ICategoryService {
  private _categoryRepository: ICategoryRepository;

  constructor(
    @inject(types.ICategoryRepository) categoryRepository: ICategoryRepository
  ) {
    this._categoryRepository = categoryRepository;
  }

  async addCategory(category: any): Promise<category> {
    try {
      const addCategory = await this._categoryRepository.addCategory(category);
      return addCategory;
    } catch (err) {
      throw new Error(
        "internal server error in the add category service. :- " + err
      );
    }
  }

  async getCategoryById(id: string): Promise<category> {
    try {
      const getCategory = this._categoryRepository.getCategoryById(id);
      return getCategory;
    } catch (err) {
      throw new Error(
        "internal server error in the category service. :- " + err
      );
    }
  }

  async getCategories(): Promise<category[]> {
    try {
      const getCategories = this._categoryRepository.getCategories();
      return getCategories;
    } catch (err) {
      throw new Error(
        "internal server error in the categorys service. :- " + err
      );
    }
  }

  async updateCategory(id: string, name: string): Promise<category> {
    try {
      const UpdateCategory = await this._categoryRepository.updateCategory(
        id,
        name
      );
      return UpdateCategory;
    } catch (err) {
      throw new Error(
        "internal server error in the update category service. :- " + err
      );
    }
  }

  async deleteCategory(id: string): Promise<category> {
    try {
      const deleteCategory = await this._categoryRepository.deleteCategory(id);
      return deleteCategory;
    } catch (err) {
      throw new Error(
        "internal server error in the delete category service. :- " + err
      );
    }
  }
}
