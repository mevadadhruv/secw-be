import {
  CreateUser,
  GetRegisterUser,
  RegisterUser,
  DocumentType,
} from "../types/userTypes";

export interface IRegisterUserService {
  UserRegistration(
    user: RegisterUser,
    users: CreateUser,
    document?: DocumentType
  ): Promise<GetRegisterUser>;
  UpdateProfile(id: string, user: RegisterUser): Promise<GetRegisterUser>;
  deleteProfile(id: string): Promise<GetRegisterUser>;
}
