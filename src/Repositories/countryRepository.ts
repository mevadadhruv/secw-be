import { injectable } from "inversify";
import { ICountryRepository } from "../interfaces/ICountryRepository";
import { Country } from "../types/userTypes";
import countryModel from "../models/country.model";
import { ObjectId } from "mongodb";
import country from "country-codes-list";

@injectable()
export default class CountryRepository implements ICountryRepository {
  async listAddCountry() {
    try {
      country.all().map(async (value) => {
        const checkCountry = await countryModel.findOne({
          $or: [
            {
              name: value.countryNameEn,
            },
            {
              code: value.countryCode,
            },
          ],
        });
        if (!checkCountry && value.countryNameEn) {
          await countryModel.create({
            name: value.countryNameEn,
            code: value.countryCode,
          });
        }
      });
      return "completily added list from country list";
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async addCountry(country: Country): Promise<Country> {
    try {
      const name = country.name;
      const code = country.code;
      const checkCountry = await countryModel.findOne({
        $or: [
          {
            name: name,
          },
          {
            code: code,
          },
        ],
      });
      if (checkCountry) {
        throw new Error("Record is already there!");
      }
      const addCountry = await countryModel.create({ name, code });
      return addCountry;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getCountrys() {
    try {
      const getAllCountrys = await countryModel.find();
      console.log(getAllCountrys);
      return getAllCountrys;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getCountryByCodeName(name?: string, code?: string): Promise<Country> {
    try {
      const getCountry = await countryModel.findOne({
        $or: [
          {
            name: name,
          },
          {
            code: code,
          },
        ],
      });
      return getCountry;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async updateCountry(id: string, country: Country): Promise<Country> {
    try {
      const updateCountry = await countryModel.findByIdAndUpdate(id, country);
      return updateCountry;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async deleteCountry(id: string): Promise<Country> {
    try {
      const deleteCountry = await countryModel.findByIdAndDelete(id);
      return deleteCountry;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
