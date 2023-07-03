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
import { GoogleAuthController } from "./GoogleAuthController";
import { config } from "../config/env";

const profileService = Container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const googleController = new GoogleAuthController(profileService);

@injectable()
export default class AuthController {
  private _UserService: IUserService;
  private _ProfilService: IRegisterUserService;

  constructor(
    @inject(types.IUserService) userService: IUserService,
    @inject(types.IRegisterUserService) profileService: IRegisterUserService
  ) {
    this._UserService = userService;
    this._ProfilService = profileService;
  }

  async AuthUser(isGoogle: Boolean): Promise<void> {
    try {
      console.log("authuser");
      passport.serializeUser((user: any, done) => {
        console.log("authuser serializeUser");
        done(null, user.id);
      });

      passport.deserializeUser(
        async (id: String, done: passport.DoneCallback) => {
          console.log("authuser deserializeUser");
          const currentUser = await this._UserService.getUserbyId(id);
          done(null, currentUser);
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
              await googleController.AuthCallback(
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
            console.log("authuser use GoogleStrategy");
            console.log("fb profile:- ", profile);
            await googleController.AuthCallback(
              accessToken,
              refreshToken,
              profile,
              done
            );
            return done(null, profile);
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}
