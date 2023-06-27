import express,{Application} from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import bodyParser,{ json } from "body-parser";
import { iocContainer as container } from "./src/config/container";
import { DatabaseConnection } from "./src/config/db";
import index from "./src/routes/index";
import passport from "passport";
import session from "express-session";
import {} from "./src/controllers/AuthController";

dotenv.config();
const port = process.env.PORT;

const app:Application = express();

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "SECRETKEY"
}));

app.use(json());
app.use(bodyParser.urlencoded({ extended:false }));

DatabaseConnection();

app.use(index.router,index.profileRouter,index.AuthRouter);

app.listen(port, ():void => {
    console.log(`server running on  ${port}`);
});