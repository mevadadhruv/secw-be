import { inject, injectable } from "inversify";
import { IRoleService } from "../interfaces/IRoleService";
import { role } from "../types/userTypes";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { types } from "../config/types";

@injectable()
export default class RoleService implements IRoleService {
  private _roleRepository: IRoleRepository;

  constructor(@inject(types.IRoleRepository) roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository;
  }

  async addRole(name: string): Promise<role> {
    try {
      const addRole = await this._roleRepository.addRole(name);
      return addRole;
    } catch (err) {
      throw new Error(
        "internal server error in the add role service. :- " + err
      );
    }
  }

  async getRoleById(id: string): Promise<role> {
    try {
      const getRole = this._roleRepository.getRoleById(id);
      return getRole;
    } catch (err) {
      throw new Error("internal server error in the role service. :- " + err);
    }
  }

  async getRoles(): Promise<role[]> {
    try {
      const getRoles = this._roleRepository.getRoles();
      return getRoles;
    } catch (err) {
      throw new Error("internal server error in the roles service. :- " + err);
    }
  }

  async updateRole(id: string, name: string): Promise<role> {
    try {
      const UpdateRole = await this._roleRepository.updateRole(id, name);
      return UpdateRole;
    } catch (err) {
      throw new Error(
        "internal server error in the update role service. :- " + err
      );
    }
  }

  async deleteRole(id: string): Promise<role> {
    try {
      const deleteRole = await this._roleRepository.deleteRole(id);
      return deleteRole;
    } catch (err) {
      throw new Error(
        "internal server error in the delete role service. :- " + err
      );
    }
  }
}
