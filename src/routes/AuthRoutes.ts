import express, { NextFunction } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController";
import {iocContainer as container} from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { GoogleAuthController } from "../controllers/GoogleAuthController";

const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(types.IRegisterUserService);
const authController = new AuthController(userService,profileService);

const googleAuthController = new GoogleAuthController(profileService);

const AuthRouter = express.Router();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

AuthRouter.get('/', (req: express.Request, res: express.Response,next:NextFunction) => { res.send("<button><a href='auth'>Google</a></button>"), next() }, authController.AuthUser);

AuthRouter.get('/auth', passport.authenticate('google', {
    scope: ["profile", "email"]
}));

AuthRouter.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth/google/callback/failure'
}));

AuthRouter.get('/auth/google/callback/success', (req, res) => {
    res.redirect("https://www.google.com/");
});

AuthRouter.get('/auth/google/callback/failure', (req, res) => {
    res.send("error");
});

export default AuthRouter;