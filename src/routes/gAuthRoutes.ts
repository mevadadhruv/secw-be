import express, { NextFunction } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthStrategyController";
import { iocContainer as container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import { handlefun } from "../helper/handlefun";
const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const authController = new AuthController(userService, profileService);
const GAuthRouter = express.Router();
GAuthRouter.use(cookieParser());
GAuthRouter.use(bodyParser.urlencoded({ extended: false }));
GAuthRouter.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat",
    name: "sid",
  })
);
GAuthRouter.use(passport.initialize());
GAuthRouter.use(passport.session());
GAuthRouter.get(
  "/gbutton",
  (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("<button><a href='/gauth'>Google</a></button>"),
      next(),
      void authController.AuthUser(true);
  }
);

GAuthRouter.get(
  "/gauth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

GAuthRouter.get(
  "/gauth/google/callback",
  passport.authenticate("google", {
    successRedirect: handlefun(true, true),
    failureRedirect: handlefun(false, true),
  })
);

export default GAuthRouter;
