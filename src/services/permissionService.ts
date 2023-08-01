import { inject, injectable } from "inversify";
import { IPermissionService } from "../interfaces/IPermissionService";
import { Permission } from "../types/userTypes";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { types } from "../config/types";

@injectable()
export default class PermissionService implements IPermissionService {
  private _permissionRepository: IPermissionRepository;

  constructor(
    @inject(types.IPermissionRepository)
    permissionRepository: IPermissionRepository
  ) {
    this._permissionRepository = permissionRepository;
  }

  async addPermission(name: string, description: string): Promise<Permission> {
    try {
      const addPermission = await this._permissionRepository.addPermission(
        name,
        description
      );
      return addPermission;
    } catch (err) {
      throw new Error("Internal server error in add permission :- " + err);
    }
  }

  async getPermissionById(id: string): Promise<Permission> {
    try {
      const getPermission = this._permissionRepository.getPermissionById(id);
      console.log("getPermission service:-", getPermission);
      return getPermission;
    } catch (err) {
      throw new Error("Internal server error in permission :- " + err);
    }
  }

  async getPermissions(): Promise<Permission[]> {
    try {
      const getPermissions = this._permissionRepository.getPermissions();
      return getPermissions;
    } catch (err) {
      throw new Error("Internal server error in permissions :- " + err);
    }
  }

  async updatePermission(
    id: string,
    name: string,
    description: string
  ): Promise<Permission> {
    try {
      if (name.length <= 0 && name.trim() === "") {
        throw new Error("please enter name ");
      }

      const UpdatePermission =
        await this._permissionRepository.updatePermission(
          id,
          name,
          description
        );
      return UpdatePermission;
    } catch (err) {
      throw new Error("Internal server error in update permissions :- " + err);
    }
  }

  async deletePermission(id: string): Promise<Permission> {
    try {
      const deletePermission =
        await this._permissionRepository.deletePermission(id);
      return deletePermission;
    } catch (err) {
      throw new Error("Internal server error in delete permissions :- " + err);
    }
  }
}
