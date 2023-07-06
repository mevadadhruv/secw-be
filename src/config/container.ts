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
import DocumentRepository from "../Repositories/DocumentRepository";
import { IDocumentService } from "../interfaces/IDocumentService";
import DocumentService from "../services/DocumentService";

const iocContainer = new Container();

iocContainer.load(buildProviderModule());
iocContainer.bind<IUserRepository>(types.IUserRepository).to(UserRepository);
iocContainer.bind<IUserService>(types.IUserService).to(UserService);
iocContainer.bind<IRegisterUserRepository>(types.IRegisterUserRepository).to(profileRepository);
iocContainer.bind<IRegisterUserService>(types.IRegisterUserService).to(ProfileService);
iocContainer.bind<IDocumentRepository>(types.IDocumentRepository).to(DocumentRepository);
iocContainer.bind<IDocumentService>(types.IDocumentService).to(DocumentService);

export {iocContainer};