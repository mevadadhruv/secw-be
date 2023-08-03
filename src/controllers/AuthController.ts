import passport from "passport";
import userModel from "../models/user.model";
import { createUser, registerUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { documentType } from "../types/userTypes";
@injectable()
export class AuthController {
  private _ProfilService: IRegisterUserService;
  constructor(
    @inject(types.IRegisterUserService) profileService: IRegisterUserService
  ) {
    this._ProfilService = profileService;
  }
  AuthCallback = async (
    accessToken: any,
    refreshToken: any,
    profile: passport.Profile,
    done: passport.DoneCallback,
    request?: any
  ) => {
    try {
      const id = profile.id;
      const email = profile!.emails[0].value;
      const firstname = profile.name?.givenName;
      const lastname = profile.name?.familyName;
      const AddUser: registerUser = {
        firstName: firstname,
        lastName: lastname,
        address: "",
        phoneNumber: "",
        sId: id,
      };
      const AddUserInfo: createUser = {
        emailId: email,
        password: "",
      };
      console.log("checking !!!" + email);
      const userCheck = await userModel.findOne({
        emailId: AddUserInfo.emailId,
      });
      console.log("checking userCheck!!!" + userCheck);
      if (!userCheck) {
        const NewUser = await this._ProfilService.userRegistration(
          AddUser,
          AddUserInfo
        );
        console.log("NewUser:- ", NewUser);
        done(null, NewUser);
      }
    } catch (err) {
      console.log(err);
      throw new Error("error in auth class" + err);
    }
  };
}
