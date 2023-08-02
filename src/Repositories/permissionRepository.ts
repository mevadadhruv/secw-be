import permissionModel from "../models/permission.model";
import { permission } from "../types/userTypes";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class PermissionRepository implements IPermissionRepository {
  async addPermission(name: string, description: string): Promise<permission> {
    try {
      const getPermission = await permissionModel.findOne({
        $or: [
          {
            name,
            description,
          },
        ],
      });
      if (getPermission) {
        throw new appError("Record must be unique Permission", 400);
      }
      const addPermission = await permissionModel.create({
        name,
        description,
      });
      return addPermission;
    } catch (err) {
      throw err;
    }
  }

  async getPermissionById(id: string): Promise<permission> {
    try {
      const getPermission = await permissionModel.findById(id);
      return getPermission;
    } catch (err) {
      throw err;
    }
  }
  async getPermissions(): Promise<permission[]> {
    try {
      const getPermissions = await permissionModel.find();
      return getPermissions;
    } catch (err) {
      throw err;
    }
  }
  async updatePermission(
    id: string,
    name: string,
    description: string
  ): Promise<permission> {
    try {
      const getPermission = await this.getPermissionById(id);

      if (!getPermission) {
        throw new appError("Record Not Found in Permission", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      const updatePermission = await permissionModel.findByIdAndUpdate(
        { _id },
        { name, description }
      );
      return updatePermission;
    } catch (err) {
      throw err;
    }
  }
  async deletePermission(id: string): Promise<permission> {
    try {
      const getPermission = await this.getPermissionById(id);
      if (!getPermission) {
        throw new appError("Record Not Found in Permission", 400);
      }
      const deletePermission = await permissionModel.findByIdAndDelete(id);
      return deletePermission;
    } catch (err) {
      throw err;
    }
  }
}
