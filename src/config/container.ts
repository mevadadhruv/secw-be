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
import { IPermissionRoleService } from "../interfaces/IPermissionRoleService";
import { IPermissionRoleRepository } from "../interfaces/IPermissionRoleRepository";
import PermissionRoleService from "../services/permissionRoleService";
import PermissionRoleRepository from "../repositories/permissionRoleRepository";
import PermissionService from "../services/permissionService";
import { IPermissionService } from "../interfaces/IPermissionService";
import PermissionRepository from "../repositories/permissionRepository";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import CategoryRepository from "../repositories/categoryRepository";
import { ICategoryService } from "../interfaces/ICategoryService";
import CategoryService from "../services/categoryService";
import { IProductService } from "../interfaces/IProductService";
import ProductRepository from "../repositories/productRepository";
import ProductService from "../services/productService";
import { IProductRepository } from "../interfaces/IProductRepository";
import { ICartRepository } from "../interfaces/ICartRepository";
import CartRepository from "../repositories/cartRepository";
import CartService from "../services/cartService";
import { ICartService } from "../interfaces/ICartService";
import { IDiscountRepository } from "../interfaces/IDiscountRepository";
import DiscountRepository from "../repositories/discountRepository";
import { IDiscountService } from "../interfaces/IDiscountService";
import { IShippingRepository } from "../interfaces/IShippingRepository";
import { IShippingService } from "../interfaces/IShippingService";
import ShippingRepository from "../repositories/shippingRepository";
import ShippingService from "../services/shippingService";
import DiscountService from "../services/discountService";
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

iocContainer
  .bind<IProductRepository>(types.IProductRepository)
  .to(ProductRepository);
iocContainer.bind<IProductService>(types.IProductService).to(ProductService);

iocContainer
  .bind<IPermissionRepository>(types.IPermissionRepository)
  .to(PermissionRepository);

iocContainer
  .bind<IPermissionService>(types.IPermissionService)
  .to(PermissionService);

iocContainer.bind<ICartRepository>(types.ICartRepository).to(CartRepository);
iocContainer.bind<ICartService>(types.ICartService).to(CartService);

iocContainer
  .bind<IDiscountRepository>(types.IDiscountRepository)
  .to(DiscountRepository);
iocContainer.bind<IDiscountService>(types.IDiscountService).to(DiscountService);

iocContainer
  .bind<IShippingRepository>(types.IShippingRepository)
  .to(ShippingRepository);
iocContainer.bind<IShippingService>(types.IShippingService).to(ShippingService);

export { iocContainer };
