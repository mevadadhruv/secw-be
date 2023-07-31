import { inject, injectable } from "inversify";
import { ICountryService } from "../interfaces/ICountryService";
import { Country } from "../types/userTypes";
import { ICountryRepository } from "../interfaces/ICountryRepository";
import { types } from "../config/types";

@injectable()
export default class CountryService implements ICountryService {
  private _countryRepository: ICountryRepository;

  constructor(
    @inject(types.ICountryRepository) countryRepository: ICountryRepository
  ) {
    this._countryRepository = countryRepository;
  }
  async deleteCountry(id: string): Promise<Country> {
    try {
      const deleteCountry = await this._countryRepository.deleteCountry(id);
      return deleteCountry;
    } catch (error) {
      throw new Error(
        "internal server error in the delete country service. which is:- " +
          error
      );
    }
  }

  async addCountry(country: Country): Promise<Country> {
    try {
      const addCountry = await this._countryRepository.addCountry(country);
      return addCountry;
    } catch (err) {
      throw new Error(
        "internal server error in the add country service. which is:- " + err
      );
    }
  }

  async getCountryByCodeName(id?: string, code?: string): Promise<Country> {
    try {
      const getCountry = this._countryRepository.getCountryByCodeName(id, code);
      return getCountry;
    } catch (err) {
      throw new Error(
        "internal server error in the country id service. which is:- " + err
      );
    }
  }

  async getCountrys(): Promise<Country[]> {
    try {
      const getCountrys = this._countryRepository.getCountrys();
      return getCountrys;
    } catch (err) {
      throw new Error(
        "internal server error in the get countries service. which is:- " + err
      );
    }
  }

  async updateCountry(id: string, country: Country): Promise<Country> {
    try {
      const UpdateCountry = await this._countryRepository.updateCountry(
        id,
        country
      );
      return UpdateCountry;
    } catch (err) {
      throw new Error(
        "internal server error in the update country service. which is:- " + err
      );
    }
  }

  async listAddCountry(): Promise<any> {
    try {
      const listCountry = await this._countryRepository.listAddCountry();
      return listCountry;
    } catch (err) {
      throw new Error(
        "internal server error in the delete country service. which is:- " + err
      );
    }
  }
}
