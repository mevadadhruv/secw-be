import { Country } from "../types/userTypes";

export interface ICountryRepository {
  addCountry(country: Country): Promise<Country>;
  getCountrys(): any;
  getCountryByCodeName(id?: string, code?: string): Promise<Country>;
  updateCountry(id: string, country: Country): Promise<Country>;
  deleteCountry(id: string): Promise<Country>;
  listAddCountry(): any;
}
