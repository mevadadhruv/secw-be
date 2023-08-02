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
import AuthStrategyController from "../controllers/authStrategyController";

const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const authController = new AuthStrategyController(userService, profileService);
const fAuthRouter = express.Router();
fAuthRouter.use(cookieParser());
fAuthRouter.use(bodyParser.urlencoded({ extended: false }));
fAuthRouter.use(
  session({
    secret: "keyboard cat",
    name: "sid",
    resave: false,
    saveUninitialized: true,
  })
);
fAuthRouter.use(passport.initialize());
fAuthRouter.use(passport.session());
fAuthRouter.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

fAuthRouter.get("/account", ensureAuthenticated, function (req, res) {
  console.log("facebook account req- ", req);
  res.render("account", { user: req.user });
});

fAuthRouter.get(
  "/fbauth",
  passport.authenticate("facebook", { scope: "email" })
);

fAuthRouter.get(
  "/fbutton",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("<button><a href='/fbauth'>facebook</a></button>"),
      next(),
      void authController.AuthUser(false);
  }
);

fAuthRouter.get(
  "/fbauth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: handlefun(true, false),
    failureRedirect: handlefun(false, false),
  })
);

fAuthRouter.get("/logout", function (req, res) {
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

export default fAuthRouter;
