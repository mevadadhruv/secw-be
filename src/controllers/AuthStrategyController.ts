import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import Facebook from "passport-facebook";
const FacebookStrategy = Facebook.Strategy;
import { inject, injectable } from "inversify";
import { iocContainer as Container } from "../config/container";
import { types } from "../config/types";
import { IUserService } from "../interfaces/IUserService";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { AuthController } from "./authController";
import { config } from "../config/env";

const profileService = Container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const controller = new AuthController(profileService);

@injectable()
export default class AuthStrategyController {
  private _userService: IUserService;
  private _profilService: IRegisterUserService;

  constructor(
    @inject(types.IUserService) userService: IUserService,
    @inject(types.IRegisterUserService) profileService: IRegisterUserService
  ) {
    this._userService = userService;
    this._profilService = profileService;
  }

  async AuthUser(isGoogle: Boolean): Promise<void> {
    try {
      passport.serializeUser((user: any, done) => {
        console.log("authuser serializeUser");
        done(null, user.id);
      });

      passport.deserializeUser(
        async (id: String, done: passport.DoneCallback) => {
          console.log("authuser deserializeUser");
          done(null, `${id}`);
        }
      );
      if (isGoogle === true) {
        passport.use(
          new GoogleStrategy(
            {
              clientID: config.GOOGLE_CLIENT_ID,
              clientSecret: config.GOOGLE_SECRET_KEY,
              callbackURL: config.GOOGLE_REDIRECT_URL,
              passReqToCallback: true,
            },
            async (
              request: any,
              accessToken: any,
              refreshToken: any,
              profile: passport.Profile,
              done: passport.DoneCallback
            ) => {
              console.log("authuser use GoogleStrategy");
              await controller.AuthCallback(
                accessToken,
                refreshToken,
                profile,
                done,
                request
              );
              return done(null, profile);
            }
          )
        );
      } else {
        passport.use(
          new FacebookStrategy(
            {
              clientID: config.FACEBOOK_API_KEY,
              clientSecret: config.FACEBOOK_API_SECRET,
              callbackURL: config.FCALLBACK_URL,
              profileFields: ["emails", "name"],
            },
            async function (
              accessToken: any,
              refreshToken: any,
              profile: any,
              done: any
            ) {
              console.log("authuser use FacebookStrategy");
              await controller.AuthCallback(
                accessToken,
                refreshToken,
                profile,
                done
              );
              return done(null, profile);
            }
          )
        );
      }
    } catch (err) {
      throw new Error("error in auth Strategy class" + err);
    }
  }
}
