import {
  createUser,
  getRegisterUser,
  registerUser,
  documentType,
} from "../types/userTypes";

export interface IRegisterUserRepository {
  userRegistration(
    user: registerUser,
    users: createUser,
    document?: documentType
  ): Promise<getRegisterUser>;
  updateProfile(id: string, user: registerUser): Promise<getRegisterUser>;
  deleteProfile(id: string): Promise<getRegisterUser>;
}