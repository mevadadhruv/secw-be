import { Country } from "../types/userTypes";

export interface ICountryService {
  addCountry(country: Country): Promise<Country>;
  getCountrys(): any;
  getCountryById(id: string): Promise<Country>;
  updateCountry(id: string, country: Country): Promise<Country>;
  deleteCountry(id: string): Promise<Country>;
  listAddCountry(): any;
}
