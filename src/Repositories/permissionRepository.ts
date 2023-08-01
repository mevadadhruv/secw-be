import permissionModel from "../models/permission.model";
import { Permission } from "../types/userTypes";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { injectable } from "inversify";
import appError from "../error/appError";
import mongoose from "mongoose";
const mongooseTypes = mongoose.Types;
@injectable()
export default class PermissionRepository implements IPermissionRepository {
  async addPermission(name: string, description: string): Promise<Permission> {
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
        throw new appError(
          "Record is There! Please provide unique Permission",
          400
        );
      }
      const addPermission = await permissionModel.create({
        name,
        description,
      });
      console.log("add permission :- ", addPermission);
      return addPermission;
    } catch (err) {
      throw err;
    }
  }

  async getPermissionById(id: string): Promise<Permission> {
    try {
      const getPermission = await permissionModel.findById(id);
      console.log("getPermission Repository :-", getPermission);

      return getPermission;
    } catch (err) {
      throw err;
    }
  }
  async getPermissions(): Promise<Permission[]> {
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
  ): Promise<Permission> {
    try {
      const getPermission = await this.getPermissionById(id);

      if (!getPermission) {
        throw new appError("Record Not Found in Permission", 400);
      }
      const _id = new mongooseTypes.ObjectId(id);
      console.log("update id:", _id);
      const updatePermission = await permissionModel.findByIdAndUpdate(
        { _id },
        { name, description }
      );
      return updatePermission;
    } catch (err) {
      throw err;
    }
  }
  async deletePermission(id: string): Promise<Permission> {
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
