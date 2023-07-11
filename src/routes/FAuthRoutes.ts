import express, { NextFunction } from "express";
import passport from "passport";
import { iocContainer as container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import { handlefun } from "../helper/handlefun";
import AuthStrategyController from "../controllers/AuthStrategyController";

const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const authController = new AuthStrategyController(userService, profileService);
const FAuthRouter = express.Router();
FAuthRouter.use(cookieParser());
FAuthRouter.use(bodyParser.urlencoded({ extended: false }));
FAuthRouter.use(
  session({
    secret: "keyboard cat",
    name: "sid",
    resave: false,
    saveUninitialized: true,
  })
);
FAuthRouter.use(passport.initialize());
FAuthRouter.use(passport.session());
FAuthRouter.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

FAuthRouter.get("/account", ensureAuthenticated, function (req, res) {
  console.log("facebook account req- ", req);
  res.render("account", { user: req.user });
});

FAuthRouter.get(
  "/fbauth",
  passport.authenticate("facebook", { scope: "email" })
);

FAuthRouter.get(
  "/fbutton",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("<button><a href='/fbauth'>facebook</a></button>"),
      next(),
      void authController.AuthUser(false);
  }
);

FAuthRouter.get(
  "/fbauth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: handlefun(true, false),
    failureRedirect: handlefun(false, false),
  })
);

FAuthRouter.get("/logout", function (req, res) {
  console.log("facebook logout");
  req.logout((err) => {
    if (err) {
      console.log("facebook logout err:- ", err);
      throw err;
    }
  });
  res.redirect("/fbutton");
});
function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("facebook ensureAuthenticated");
  res.redirect("/login");
}

export default FAuthRouter;
