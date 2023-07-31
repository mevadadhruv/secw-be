import express from "express";
import CountryController from "../controllers/countryController";
import { iocContainer as Container } from "../config/container";
import { ICountryService } from "../interfaces/ICountryService";
import { types } from "../config/types";

const countryService = Container.get<ICountryService>(types.ICountryService);
const countryController = new CountryController(countryService);

const countryRouter = express.Router();

countryRouter.post("/createcountry", (req, res, next) =>
  countryController.addCountry(req, res, next)
);
countryRouter.get("/getcountry/:id", (req, res, next) =>
  countryController.getCountryById(req, res, next)
);
countryRouter.get("/getcountries", (req, res, next) =>
  countryController.getCountrys(req, res, next)
);
countryRouter.put("/updatecountry/", (req, res, next) =>
  countryController.updateCountry(req, res, next)
);
countryRouter.delete("/deletecountry/:id", (req, res, next) =>
  countryController.deleteCountry(req, res, next)
);
countryRouter.post("/listaddcountry", (req, res, next) =>
  countryController.listAddCountry(req, res, next)
);
export default countryRouter;
