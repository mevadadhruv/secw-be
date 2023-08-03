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
      throw new Error(
        "internal server error in the permission role service. :- " + err
      );
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
      throw new Error(
        "internal server error in the add permission role service. :- " + err
      );
    }
  }

  async getPermissionRoles() {
    try {
      const findPermissionRole =
        await this._permissionRoleRepo.getPermissionRoles();
      return findPermissionRole;
    } catch (err) {
      throw new Error(
        "internal server error in the permission roles service. :- " + err
      );
    }
  }

  async deletePermissionRole(id: string) {
    try {
      const deleteVenUser = await this._permissionRoleRepo.deletePermissionRole(
        id
      );
      return deleteVenUser;
    } catch (err) {
      throw new Error(
        "internal server error in the delete permission role service. :- " + err
      );
    }
  }
}
