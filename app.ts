import express,{Application} from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import bodyParser,{ json } from "body-parser";
import { iocContainer as container } from "./src/config/container";
import { DatabaseConnection } from "./src/config/db";
import index from "./src/routes/index";
import {config} from "./src/config/env";

dotenv.config();
const port = config.PORT;
const app:Application = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended:false }));

DatabaseConnection();

app.use(index.router,index.profileRouter);

app.listen(port, ():void => {
    console.log(`server running on  ${port}`);
});