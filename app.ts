import express, { Application } from "express";
import "reflect-metadata";
import bodyParser, { json } from "body-parser";
import { DatabaseConnection } from "./src/config/db";
import index from "./src/routes/index";
import { config } from "./src/config/env";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = config.PORT;
const app: Application = express();

app.use(cors({ origin: "*" }));
app.options("*", cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

DatabaseConnection();

app.use(index.router, index.FAuthRouter, index.GAuthRoutes);
app.use("/profile", index.profileRouter);
app.use("/document", index.DocumentRouter);
app.use("/vendor", index.VendorRouter);
app.use("/role", index.roleRouter);
app.use("/vendorUser", index.VendorUserRouter);
app.use("/country", index.countryRouter);

app.listen(port, (): void => {
  console.log(`server running on  ${port}`);
});
