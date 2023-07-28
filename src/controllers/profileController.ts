import express, { NextFunction } from "express";
import { createUser, registerUser, documentType } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";
import document from "../config/document";
import AppError from "../Error/AppError";
import { checking } from "../Error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");

@injectable()
export default class ProfileController {
  private _profileService: IRegisterUserService;

  constructor(
    @inject(types.IRegisterUserService) profileService: IRegisterUserService
  ) {
    this._profileService = profileService;
  }

  async userRegistration(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const uplodImage = document("dhruv-images").single("Attachment");
      uplodImage(req, res, async (err: any) => {
        if (err) {
          return new AppError("Image not found", 301);
        }
        const documentFile: any = req.file;
        const documentName = documentFile.originalname;
        const documentDescription = documentFile.encoding;
        const documentAttachment = documentFile.location;
        const documentExtension = documentFile.mimetype;
        const documentSize = documentFile.size;
        const documentType: documentType = {
          name: documentName,
          description: documentDescription,
          attachment: documentAttachment,
          extension: documentExtension,
          size: documentSize,
        };
        const register: registerUser = {
          address: req.body.Address,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          phoneNumber: req.body.phone_number,
        };
        const Registeration: createUser = {
          emailId: req.body.emailId,
          password: req.body.password,
        };
        console.log(documentType);
        const registerUser = await this._profileService.userRegistration(
          register,
          Registeration,
          documentType
        );
        if (registerUser) {
          return res
            .status(200)
            .json({ message: "User register successfully!!" });
        }
      });
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async updateProfile(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updateProfileId = req.params.id;
      const Profile: registerUser = {
        address: req.body.Address,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNumber: req.body.phone_number,
      };
      const updateProfile = await this._profileService.updateProfile(
        updateProfileId,
        Profile
      );
      if (updateProfile) {
        return message.sendResponse(
          200,
          "updated sucessfully",
          updateProfile,
          res
        );
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteProfile(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteProfileId = req.params.id;
      const deleteProfile = await this._profileService.deleteProfile(
        deleteProfileId
      );
      if (deleteProfile) {
        return message.sendResponseDelete(200, "Deleted successfully", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}