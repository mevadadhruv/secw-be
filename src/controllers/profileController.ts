import express, { NextFunction } from "express";
import { createUser, registerUser, documentType } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { IRegisterUserService } from "../interfaces/IRegisterUserService";
import { types } from "../config/types";
import document from "../config/document";
import appError from "../error/appError";
import { checking, sendErrorProd } from "../error/globalErrorHandler";
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
          return new appError("Image not found", 301);
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
        console.log("documentType:- ", documentType);
        const register: registerUser = {
          address: req.body.Address,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          phoneNumber: req.body.phone_number,
        };
        const registeration: createUser = {
          emailId: req.body.emailId,
          password: req.body.password,
        };
        console.log(documentType);
        const registerUser = await this._profileService.userRegistration(
          register,
          registeration,
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
      const profile: registerUser = {
        address: req.body.Address,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNumber: req.body.phone_number,
      };
      const updateProfile = await this._profileService.updateProfile(
        req.params.id,
        profile
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
      const deleteProfile = await this._profileService.deleteProfile(
        req.params.id
      );
      if (deleteProfile) {
        return message.sendResponseDelete(200, "Deleted successfully", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
