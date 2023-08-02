import categoryModel from "../models/category.model";
import { category } from "../types/userTypes";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const mongooseTypes = mongoose.Types;
@injectable()
export default class CategoryRepository implements ICategoryRepository {
  async addCategory(category: any): Promise<category> {
    try {
      const addCategory = await categoryModel.create({
        name: category.name,
        categoryId: category.categoryId
          ? new ObjectId(category.categoryId)
          : null,
      });
      return addCategory;
    } catch (err) {
      throw err;
    }
  }

  async getCategoryById(id: string): Promise<category> {
    try {
      const getCategory = await categoryModel.findById(id);
      return getCategory;
    } catch (err) {
      throw err;
    }
  }
  async getCategories(): Promise<category[]> {
    try {
      const getCategories = await categoryModel.find();
      return getCategories;
    } catch (err) {
      throw err;
    }
  }
  async updateCategory(id: string, name: string): Promise<category> {
    try {
      const getCategory = await this.getCategoryById(id);
      if (!getCategory) {
        throw new appError("Record Not Found in Category", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateCategory = await categoryModel.findByIdAndUpdate(
        { _id },
        { name: name }
      );
      return updateCategory;
    } catch (err) {
      throw err;
    }
  }
  async deleteCategory(id: string): Promise<category> {
    try {
      const getCategory = await this.getCategoryById(id);
      if (!getCategory) {
        throw new appError("Record Not Found in Category", 400);
      }
      const deleteCategory = await categoryModel.findByIdAndDelete(id);
      return deleteCategory;
    } catch (err) {
      throw err;
    }
  }
}
