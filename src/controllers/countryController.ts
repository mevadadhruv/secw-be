import express, { NextFunction } from "express";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import { inject, injectable } from "inversify";
import { ICountryService } from "../interfaces/ICountryService";
import { types } from "../config/types";

@injectable()
export default class CountryController {
  private _countryService: ICountryService;
  constructor(@inject(types.ICountryService) countryService: ICountryService) {
    this._countryService = countryService;
  }
  async addCountry(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const addCountry = await this._countryService.addCountry(req.body);
      if (addCountry) {
        return message.sendResponse(
          200,
          "successfully created country",
          addCountry,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCountryByCodeName(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const countryId = req.body.name;
      const code = req.body.code;
      const getCountrys = await this._countryService.getCountryByCodeName(
        countryId,
        code
      );
      if (getCountrys) {
        return message.sendResponse(
          200,
          "successfully country",
          getCountrys,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async getCountrys(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const getCountrys = await this._countryService.getCountrys();
      if (getCountrys) {
        return message.sendResponse(
          200,
          "successfully countries",
          getCountrys,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }

  async updateCountry(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updatedCountry = await this._countryService.updateCountry(
        req.body.id,
        req.body
      );
      console.log("updatedCountry", updatedCountry);

      if (updatedCountry) {
        return message.sendResponse(
          200,
          "successfully updated country",
          updatedCountry,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async deleteCountry(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteId = req.params.id;
      const DeleteCountry = await this._countryService.deleteCountry(deleteId);
      if (DeleteCountry) {
        return message.sendResponseDelete(
          200,
          "successfully deleted country!",
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
  async listAddCountry(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      let listCountry = await this._countryService.listAddCountry();
      if (listCountry) {
        listCountry = "done!!";
        return message.sendResponse(
          200,
          "successfully created country",
          listCountry,
          res
        );
      }
    } catch (err) {
      return sendErrorProd(err, req, res);
    }
  }
}
