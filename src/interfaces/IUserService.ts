import { createUser, getUser, updateUser } from "../types/userTypes";

export interface IUserService {
  createUser(user: createUser): Promise<getUser>;
  getUser(): any;
  getUserbyId(id: String): Promise<getUser>;
  updateUser(id: String, user: updateUser): Promise<getUser>;
  deleteUser(id: String): Promise<getUser>;
  loginUser(user: createUser): Promise<getUser>;
}
