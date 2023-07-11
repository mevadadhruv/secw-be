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
import VendorService from "../services/VendorService";
import { IVendorUserRepository } from "../interfaces/IVendorUserRepository";
import { IVendorUserService } from "../interfaces/IVendorUserService";
import VendorUserService from "../services/VendorUserService";
import VendorUserRepository from "../repositories/VendorUserRepository";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import RoleRepository from "../repositories/roleRepository";
import { IRoleService } from "../interfaces/IRoleService";
import RoleService from "../services/roleService";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import ReviewRepository from "../repositories/reviewRepository";
import { IReviewService } from "../interfaces/IReviewService";
import ReviewService from "../services/reviewService";

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
iocContainer.bind<IReviewRepository>(types.IReviewRepository).to(ReviewRepository);
iocContainer.bind<IReviewService>(types.IReviewService).to(ReviewService);

export { iocContainer };