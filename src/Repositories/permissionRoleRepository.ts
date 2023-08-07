import { inject, injectable } from "inversify";
import { IPermissionRoleRepository } from "../interfaces/IPermissionRoleRepository";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { types } from "../config/types";
import PermissionRoleModel from "../models/permissionRole.model";

@injectable()
export default class PermissionRoleRepository
  implements IPermissionRoleRepository
{
  private _permissionRepo: IPermissionRepository;
  private _roleRepo: IRoleRepository;

  constructor(
    @inject(types.IPermissionRepository) permissionRepo: IPermissionRepository,
    @inject(types.IRoleRepository) roleRepo: IRoleRepository
  ) {
    this._permissionRepo = permissionRepo;
    this._roleRepo = roleRepo;
  }

  async getPermissionRolebyId(id: string) {
    try {
      const findPermissionbyId = await PermissionRoleModel.findById(id);
      if (!findPermissionbyId) {
        throw new Error("Record is not there!");
      }
      return findPermissionbyId;
    } catch (err) {
      throw err;
    }
  }

  async addPermissionRole(permissionId: string, roleId: string) {
    try {
      const roleRegister = await this._roleRepo.getRoleById(roleId);
      const permissionRegister = await this._permissionRepo.getPermissionById(
        permissionId
      );
      if (!roleRegister || !permissionRegister) {
        throw new Error("something is missing please check!");
      }
      const checkPermissionRole = await PermissionRoleModel.findOne({
        $and: [{ permissionId, roleId }],
      });
      if (checkPermissionRole) {
        throw new Error("Record must be unique");
      }
      const addPermissionRole = await PermissionRoleModel.create({
        roleId: roleRegister.id,
        permissionId: permissionRegister.id,
      });
      return addPermissionRole;
    } catch (err) {
      throw err;
    }
  }

  async getPermissionRoles() {
    try {
      const findPermissionRole = await PermissionRoleModel.find();
      return findPermissionRole;
    } catch (err) {
      throw err;
    }
  }

  async deletePermissionRole(id: string) {
    try {
      const deletePermissionRole = await PermissionRoleModel.findByIdAndDelete(
        id
      );
      return deletePermissionRole;
    } catch (err) {
      throw err;
    }
  }
}
