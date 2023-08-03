import { createUser, updateUser, getUser } from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable, inject } from "inversify";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import appError from "../error/appError";
import userModel from "../models/user.model";

@injectable()
export default class UserService implements IUserService {
  private _userrepository: IUserRepository;

  constructor(@inject(types.IUserRepository) userRepository: IUserRepository) {
    this._userrepository = userRepository;
  }

  async createUser(user: createUser): Promise<getUser> {
    try {
      const existingUser = await userModel.findOne({ emailId: user.emailId });
      if (existingUser) {
        throw new appError("email is already exist", 400);
      }
      const repo = await this._userrepository.createUser(user);
      return repo;
    } catch (err) {
      throw new Error(
        "internal server error in the add user service. :- " + err
      );
    }
  }

  async getUser() {
    try {
      const user = await this._userrepository.getUser();
      return user;
    } catch (err) {
      throw new Error("internal server error in the user service. :- " + err);
    }
  }

  async getUserbyId(id: string): Promise<getUser> {
    try {
      const users = await this._userrepository.getUserbyId(id);
      if (!users) {
        throw new appError("user does not exist", 400);
      } else {
        return users;
      }
    } catch (err) {
      throw new Error("internal server error in the user service. :- " + err);
    }
  }

  async updateUser(id: String, user: updateUser): Promise<getUser> {
    try {
      const users = await this._userrepository.getUserbyId(id);
      if (!users) {
        throw new appError("user does not exist", 400);
      } else {
        const updateUser = await this._userrepository.updateUser(id, user);
        return updateUser;
      }
    } catch (err) {
      throw new Error(
        "internal server error in the update user service. :- " + err
      );
    }
  }

  async deleteUser(id: String): Promise<getUser> {
    try {
      const users = await this._userrepository.getUserbyId(id);
      if (!users) {
        throw new appError("user does not exist", 400);
      } else {
        const deleteUser = await this._userrepository.deleteUser(id);
        return deleteUser;
      }
    } catch (err) {
      throw new Error(
        "internal server error in the delete user service. :- " + err
      );
    }
  }

  async loginUser(user: createUser): Promise<getUser> {
    try {
      const checkUser = await this._userrepository.loginUser(user);
      console.log(checkUser);
      return checkUser;
    } catch (err) {
      throw new Error(
        "internal server error in the login user service. :- " + err
      );
    }
  }
}
