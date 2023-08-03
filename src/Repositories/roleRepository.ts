import roleModel from "../models/role.model";
import { role } from "../types/userTypes";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class RoleRepository implements IRoleRepository {
  async addRole(name: string): Promise<role> {
    try {
      const addRole = await roleModel.create({
        name: name,
      });
      return addRole;
    } catch (err) {
      throw err;
    }
  }

  async getRoleById(id: string): Promise<role> {
    try {
      const getRole = await roleModel.findById(id);
      return getRole;
    } catch (err) {
      throw err;
    }
  }
  async getRoles(): Promise<role[]> {
    try {
      const getRoles = await roleModel.find();
      return getRoles;
    } catch (err) {
      throw err;
    }
  }
  async updateRole(id: string, name: string): Promise<role> {
    try {
      const getRole = await this.getRoleById(id);
      if (!getRole) {
        throw new appError("Record Not Found in Role", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updateRole = await roleModel.findByIdAndUpdate(
        { _id },
        { name: name }
      );
      return updateRole;
    } catch (err) {
      throw err;
    }
  }
  async deleteRole(id: string): Promise<role> {
    try {
      const getRole = await this.getRoleById(id);
      if (!getRole) {
        throw new appError("Record Not Found in Role", 400);
      }
      const deleteRole = await roleModel.findByIdAndDelete(id);
      return deleteRole;
    } catch (err) {
      throw err;
    }
  }
}
