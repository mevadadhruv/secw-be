import express, { NextFunction } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController";
import { iocContainer as container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(
  types.IRegisterUserService
);
const authController = new AuthController(userService, profileService);

const AuthRouter = express.Router();

const app = express();
const handlefun = (isSuccess: boolean, isLink: boolean): string => {
  let data;
  if (isSuccess === true) {
    setTimeout(() => {
      "<h1>Login successfully!</h1>";
    }, 5000);
    if (isLink === true) {
      data = "https://www.google.com/";
    } else {
      data = "https://www.facebook.com/";
    }
  } else {
    setTimeout(() => {
      "<h1>Login Failed!</h1>";
    }, 5000);
    if (isLink === true) {
      data = "/gbutton";
    } else {
      data = "/fbutton";
    }
  }
  return data;
};
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "keyboard cat", name: "sid" }));
app.use(passport.initialize());
app.use(passport.session());

//fb
app.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

app.get("/account", ensureAuthenticated, function (req, res) {
  console.log("account req- ", req);
  res.render("account", { user: req.user });
});

AuthRouter.get(
  "/",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("<button><a href='/fbauth'>facebook</a></button>"), next();
    await authController.AuthUser(false);
  }
);

app.get("/fbauth", passport.authenticate("facebook", { scope: "email" }));

app.get(
  "/fbauth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: handlefun(false, false),
    failureRedirect: handlefun(false, false),
  })
);

app.get("/logout", function (req, res) {
  console.log("logout");
  req.logout((err) => {
    if (err) {
      console.log("logout err:- ", err);
      throw err;
    }
  });
  res.redirect("/fbutton");
});
function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("ensureAuthenticated");
  res.redirect("/login");
}

export default AuthRouter;
