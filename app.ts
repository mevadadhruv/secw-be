import express, { Application } from "express";
import "reflect-metadata";
import bodyParser, { json } from "body-parser";
import { DatabaseConnection } from "./src/config/db";
import index from "./src/routes/index";
import session from "express-session";
import { config } from "./src/config/env";

const app: Application = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "SECRETKEY",
  })
);

app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));

DatabaseConnection();

app.use(index.router, index.profileRouter, index.AuthRouter);

app.listen(config.PORT, (): void => {
  console.log(`server running on  ${config.PORT}`);
});
