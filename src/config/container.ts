import { Container } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { buildProviderModule } from "inversify-binding-decorators";
import { types } from "./types";
import UserRepository from "../repositories/userRepository";
import { IUserService } from "../interfaces/IUserService";
import UserService from "../services/userService";
import "reflect-metadata";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import ProfileService from "../services/profileService";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import profileRepository from "../repositories/profileRepository";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import DocumentRepository from "../repositories/documentRepository";
import { IDocumentService } from "../interfaces/IDocumentService";
import DocumentService from "../services/documentService";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import VendorRepository from "../repositories/vendorRepository";
import { IVendorService } from "../interfaces/IVendorService";
import VendorService from "../services/vendorService";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import VendorUserService from "../services/vendorUserService";
import VendorUserRepository from "../repositories/vendorUserRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import RoleRepository from "../repositories/roleRepository";
import { IRoleService } from "../interfaces/IRoleService";
import RoleService from "../services/roleService";
import { ICountryService } from "../interfaces/ICountryService";
import { ICountryRepository } from "../interfaces/ICountryRepository";
import CountryRepository from "../repositories/countryRepository";
import CountryService from "../services/countryService";
import { IUserRoleService } from "../interfaces/IUserRoleService";
import UserRoleService from "../services/userRoleService";
import { IUserRoleRepository } from "../interfaces/IUserRoleRepository";
import UserRoleRepository from "../repositories/userRoleRepository";

const iocContainer = new Container();

iocContainer.load(buildProviderModule());
iocContainer.bind<IUserRepository>(types.IUserRepository).to(UserRepository);
iocContainer.bind<IUserService>(types.IUserService).to(UserService);
iocContainer
  .bind<IRegisterUserRepository>(types.IRegisterUserRepository)
  .to(profileRepository);
iocContainer
  .bind<IRegisterUserService>(types.IRegisterUserService)
  .to(ProfileService);
iocContainer
  .bind<IDocumentRepository>(types.IDocumentRepository)
  .to(DocumentRepository);
iocContainer.bind<IDocumentService>(types.IDocumentService).to(DocumentService);
iocContainer
  .bind<IVendorRepository>(types.IVendorRepository)
  .to(VendorRepository);
iocContainer.bind<IVendorService>(types.IVendorService).to(VendorService);

iocContainer
  .bind<IVendorUserRepository>(types.IVendorUserRepository)
  .to(VendorUserRepository);
iocContainer
  .bind<IVendorUserService>(types.IVendorUserService)
  .to(VendorUserService);
iocContainer.bind<IRoleService>(types.IRoleService).to(RoleService);
iocContainer.bind<IRoleRepository>(types.IRoleRepository).to(RoleRepository);

iocContainer.bind<IUserRoleService>(types.IUserRoleService).to(UserRoleService);
iocContainer
  .bind<IUserRoleRepository>(types.IUserRoleRepository)
  .to(UserRoleRepository);

iocContainer.bind<ICountryService>(types.ICountryService).to(CountryService);
iocContainer
  .bind<ICountryRepository>(types.ICountryRepository)
  .to(CountryRepository);
export { iocContainer };
