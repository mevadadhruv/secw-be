import { inject, injectable } from "inversify";
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import { IPermissionRoleRepository } from "../interfaces/IPermissionRoleRepository";
import { types } from "../config/types";

@injectable()
export default class PermissionRoleService implements IPermissionRoleService {
  private _permissionRoleRepo: IPermissionRoleRepository;

  constructor(
    @inject(types.IPermissionRoleRepository)
    permissionRoleRepo: IPermissionRoleRepository
  ) {
    this._permissionRoleRepo = permissionRoleRepo;
  }

  async getPermissionRolebyId(id: string) {
    try {
      const findPermissionRole =
        await this._permissionRoleRepo.getPermissionRolebyId(id);
      return findPermissionRole;
    } catch (err) {
      console.log("permission role service");
      throw err;
    }
  }

  async addPermissionRole(vendor: string, user: string) {
    try {
      const permissionRoleId = await this._permissionRoleRepo.addPermissionRole(
        vendor,
        user
      );
      return permissionRoleId;
    } catch (err) {
      console.log("create permission role service");
      throw err;
    }
  }

  async getPermissionRoles() {
    try {
      const findPermissionRole =
        await this._permissionRoleRepo.getPermissionRoles();
      return findPermissionRole;
    } catch (err) {
      console.log("permission roles service");
      throw err;
    }
  }

  async deletePermissionRole(id: string) {
    try {
      const deleteVenUser = await this._permissionRoleRepo.deletePermissionRole(
        id
      );
      return deleteVenUser;
    } catch (err) {
      console.log("delete permission role service");
      throw err;
    }
  }
}
