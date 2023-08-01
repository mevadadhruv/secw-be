import { inject, injectable } from "inversify";
import { IUserRoleService } from "../interfaces/IUserRoleService";
import { IUserRoleRepository } from "../interfaces/IUserRoleRepository";
import { types } from "../config/types";

@injectable()
export default class UserRoleService implements IUserRoleService {
  private _userRoleRepo: IUserRoleRepository;

  constructor(
    @inject(types.IUserRoleRepository) userRoleRepo: IUserRoleRepository
  ) {
    this._userRoleRepo = userRoleRepo;
  }

  async getUserRolebyId(id: string) {
    try {
      const findUserRole = await this._userRoleRepo.getUserRolebyId(id);
      return findUserRole;
    } catch (err) {
      throw new Error("internal server error user role service" + err);
    }
  }

  async addUserRole(vendor: string, user: string) {
    try {
      const userRoleId = await this._userRoleRepo.addUserRole(vendor, user);
      return userRoleId;
    } catch (err) {
      throw new Error("internal server error add user role service" + err);
    }
  }

  async getUserRoles() {
    try {
      const findUserRoles = await this._userRoleRepo.getUserRoles();
      return findUserRoles;
    } catch (err) {
      throw new Error("internal server error user roles service" + err);
    }
  }

  async deleteUserRole(id: string) {
    try {
      const deleteVenUser = await this._userRoleRepo.deleteUserRole(id);
      return deleteVenUser;
    } catch (err) {
      throw new Error("internal server error delete user role service" + err);
    }
  }
}
