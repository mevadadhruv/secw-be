import { inject, injectable } from "inversify";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import profileModel from "../models/profile.model";
import {
  createUser,
  getRegisterUser,
  registerUser,
  documentType,
} from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";

@injectable()
export default class profileRepository implements IRegisterUserRepository {
  private _userRepository: IUserRepository;
  private _documentRepository: IDocumentRepository;

  constructor(
    @inject(types.IUserRepository) userRepo: IUserRepository,
    @inject(types.IDocumentRepository) documentRepo: IDocumentRepository
  ) {
    this._userRepository = userRepo;
    this._documentRepository = documentRepo;
  }

  async userRegistration(
    user: registerUser,
    users: createUser,
    document: documentType
  ): Promise<getRegisterUser> {
    try {
      const documentRegister = await this._documentRepository.addDocument(
        document
      );
      const documentId = documentRegister;
      const Address = user.address;
      const first_name = user.firstName;
      const last_name = user.lastName;
      const phone_number = user.phoneNumber;
      const userRegister = await this._userRepository.createUser(users);
      console.log("document register", documentRegister);
      const userId = (await userRegister).id;
      console.log("inside repository", documentId);
      const RegisterUser = await profileModel.create({
        Address,
        first_name,
        last_name,
        phone_number,
        userId,
        documentId: documentId.id,
      });
      return RegisterUser;
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(
    id: string,
    user: registerUser
  ): Promise<getRegisterUser> {
    try {
      const updateProfile = await profileModel.findByIdAndUpdate(id, user);
      return {
        id: updateProfile.id,
        address: updateProfile.address,
        firstName: updateProfile.firstName,
        lastName: updateProfile.lastName,
        phoneNumber: updateProfile.phoneNumber,
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteProfile(id: string): Promise<getRegisterUser> {
    try {
      const deleteprofile = await profileModel.findByIdAndDelete(id);
      return {
        id: deleteprofile.id,
        address: deleteprofile.address,
        firstName: deleteprofile.firstName,
        lastName: deleteprofile.lastName,
        phoneNumber: deleteprofile.phoneNumber,
      };
    } catch (err) {
      throw err;
    }
  }
}
