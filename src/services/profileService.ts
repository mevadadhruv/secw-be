import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import {
  createUser,
  getRegisterUser,
  registerUser,
  documentType,
} from "../types/userTypes";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import { types } from "../config/types";

@injectable()
export default class ProfileService implements IRegisterUserService {
  private _profileRepository: IRegisterUserRepository;
  constructor(
    @inject(types.IRegisterUserRepository) profileRepo: IRegisterUserRepository
  ) {
    this._profileRepository = profileRepo;
  }
  async userRegistration(
    user: registerUser,
    users: createUser,
    document: documentType
  ): Promise<getRegisterUser> {
    try {
      const registerUser = await this._profileRepository.userRegistration(
        user,
        users,
        document
      );
      return registerUser;
    } catch (err) {
      throw new Error(
        "internal server error in the profile service. :- " + err
      );
    }
  }

  async updateProfile(
    id: string,
    user: registerUser
  ): Promise<getRegisterUser> {
    try {
      const updateProfile = await this._profileRepository.updateProfile(
        id,
        user
      );
      return updateProfile;
    } catch (err) {
      throw new Error(
        "internal server error in the update profile service. :- " + err
      );
    }
  }

  async deleteProfile(id: string): Promise<getRegisterUser> {
    try {
      const DeleteProfile = await this._profileRepository.deleteProfile(id);
      return DeleteProfile;
    } catch (err) {
      throw new Error(
        "internal server error in the delete profile service. :- " + err
      );
    }
  }
}
