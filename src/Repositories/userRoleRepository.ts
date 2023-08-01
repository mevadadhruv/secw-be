import { inject, injectable } from "inversify";
import { IUserRoleRepository } from "../interfaces/IUserRoleRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";
import UserRoleModel from "../models/userRole.model";

@injectable()
export default class UserRoleRepository implements IUserRoleRepository {
  private _roleRepo: IRoleRepository;
  private _userRepo: IUserRepository;

  constructor(
    @inject(types.IRoleRepository) roleRepo: IRoleRepository,
    @inject(types.IUserRepository) userRepo: IUserRepository
  ) {
    this._roleRepo = roleRepo;
    this._userRepo = userRepo;
  }

  async getUserRolebyId(id: string) {
    try {
      const findRolebyId = await UserRoleModel.findById(id);
      return findRolebyId;
    } catch (err) {
      throw err;
    }
  }

  async addUserRole(roleId: string, userId: string) {
    try {
      const userRegister = await this._userRepo.getUserbyId(userId);
      const roleRegister = await this._roleRepo.getRoleById(roleId);
      const addUserRole = await UserRoleModel.create({
        userId: userRegister.id,
        RoleId: roleRegister.id,
      });
      return addUserRole;
    } catch (err) {
      throw err;
    }
  }

  async getUserRoles() {
    try {
      const findUserRole = await UserRoleModel.find();
      return findUserRole;
    } catch (err) {
      throw err;
    }
  }

  async deleteUserRole(id: string) {
    try {
      const deleteUserRole = await UserRoleModel.findByIdAndDelete(id);
      return deleteUserRole;
    } catch (err) {
      throw err;
    }
  }
}
