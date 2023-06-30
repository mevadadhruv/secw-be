import express, { NextFunction } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController";
import { iocContainer as container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { GoogleAuthController } from "../controllers/GoogleAuthController";

const userService = container.get<IUserService>(types.IUserService);
const profileService = container.get<IRegisterUserService>(types.IRegisterUserService);
const authController = new AuthController(userService, profileService);

const googleAuthController = new GoogleAuthController(profileService);

const AuthRouter = express.Router();

const app = express();
const handlefun = (isSuccess: boolean): string => {
    let data
    if (isSuccess) {
        setTimeout(() => {
            "<h1>Login successfully!</h1>"
        }, 5000)
        data = "https://www.google.com/"
    }
    else {
        setTimeout(() => {
            "<h1>Login Failed!</h1>"
        }, 5000)
        data = "/"
    }
    return data
}
app.use(passport.initialize());
app.use(passport.session());

AuthRouter.get('/', (req: express.Request, res: express.Response, next: NextFunction) => { res.send("<button><a href='gauth'>Google</a></button>"), next() }, authController.AuthUser);

AuthRouter.get('/gauth', passport.authenticate('google', {
    scope: ["profile", "email"]
}));

AuthRouter.get('/gauth/google/callback',
    passport.authenticate('google', {
        successRedirect: handlefun(true),
        failureRedirect: handlefun(false)
    }));



// function Handle(isSuccess: boolean): string {
//     let data
//     if (isSuccess) {
//         setTimeout(() => {
//             "<h1>Login successfully!</h1>"
//         }, 5000)
//         data = "https://google.com/"
//     }
//     else {
//         setTimeout(() => {
//             "<h1>Login Failed!</h1>"
//         }, 5000)
//         data = "/"
//     }
//     console.log('data:-', data);
//     return data
// }

export default AuthRouter;