import passport from "passport";
import userModel from "../models/user.model";
import { CreateUser, RegisterUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";

@injectable()
export class GoogleAuthController {
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
    console.log("inside await function :- ", profile);
    try {
      console.log("/......");
      const id = profile.id;
      console.log(id);
      const email = profile!.emails[0].value;
      console.log(email);
      const firstname = profile.name?.givenName;
      console.log(firstname);
      const lastname = profile.name?.familyName;
      console.log(lastname);
      const AddUser: RegisterUser = {
        firstName: firstname,
        lastName: lastname,
        address: "",
        phoneNumber: "",
        sId: id,
      };
      const AddUserInfo: CreateUser = {
        emailId: email,
        password: "",
      };
      const userCheck = await userModel.findOne({ emailId: email });
      if (!userCheck) {
        const NewUser = this._ProfilService.UserRegistration(
          AddUser,
          AddUserInfo
        );
        console.log("NewUser:- ", NewUser);
        console.log("yes it saved");
        done(null, NewUser);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
