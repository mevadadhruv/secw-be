import { Container } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { buildProviderModule } from "inversify-binding-decorators";
import { types } from "./types";
import UserRepository from "../Repositories/userRepository";
import { IUserService } from "../interfaces/IUserService";
import UserService from "../services/userService";
import "reflect-metadata";
import { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";
import ProfileService from "../services/profileService";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import profileRepository from "../Repositories/profileRepository";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import DocumentRepository from "../Repositories/documentRepository";
import { IDocumentService } from "../interfaces/IDocumentService";
import DocumentService from "../services/documentService";
import { IVendorRepository } from "../interfaces/IVendorRepository";
import VendorRepository from "../Repositories/vendorRepository";
import { IVendorService } from "../interfaces/IVendorService";
import VendorService from "../services/vendorService";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import VendorUserService from "../services/vendorUserService";
import VendorUserRepository from "../Repositories/vendorUserRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import RoleRepository from "../Repositories/roleRepository";
import { IRoleService } from "../interfaces/IRoleService";
import RoleService from "../services/roleService";
import { ICountryService } from "../interfaces/ICountryService";
import { ICountryRepository } from "../interfaces/ICountryRepository";
import CountryRepository from "../Repositories/countryRepository";
import CountryService from "../services/countryService";
import PermissionRepository from "../Repositories/permissionRepository";
import PermissionService from "../services/permissionService";
import { IPermissionService } from "../interfaces/IPermissionService";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import PermissionRoleRepository from "../Repositories/permissionRoleRepository";
import { IPermissionRoleRepository } from "../interfaces/IPermissionRoleRepository";
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import PermissionRoleService from "../services/permissionRoleService";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import CategoryRepository from "../Repositories/categoryRepository";
import { ICategoryService } from "../interfaces/ICategoryService";
import CategoryService from "../services/categoryService";

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

iocContainer
  .bind<IPermissionService>(types.IPermissionService)
  .to(PermissionService);
iocContainer
  .bind<IPermissionRepository>(types.IPermissionRepository)
  .to(PermissionRepository);

iocContainer.bind<ICountryService>(types.ICountryService).to(CountryService);
iocContainer
  .bind<ICountryRepository>(types.ICountryRepository)
  .to(CountryRepository);

iocContainer
  .bind<IPermissionRoleService>(types.IPermissionRoleService)
  .to(PermissionRoleService);
iocContainer
  .bind<IPermissionRoleRepository>(types.IPermissionRoleRepository)
  .to(PermissionRoleRepository);
iocContainer
  .bind<ICategoryRepository>(types.ICategoryRepository)
  .to(CategoryRepository);
iocContainer.bind<ICategoryService>(types.ICategoryService).to(CategoryService);

export { iocContainer };
