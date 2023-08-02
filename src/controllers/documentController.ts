import express, { NextFunction } from "express";
import { checking, sendErrorProd } from "../error/globalErrorHandler";
import document from "../config/document";
const message = require("../error/globalSuccessHandler");
import appError from "../error/appError";
import { inject, injectable } from "inversify";
import { IDocumentService } from "../interfaces/IDocumentService";
import { types } from "../config/types";
import { documentType } from "../types/userTypes";

@injectable()
export default class DocumentController {
  private _documentService: IDocumentService;

  constructor(
    @inject(types.IDocumentService) documentService: IDocumentService
  ) {
    this._documentService = documentService;
  }

  async addDocument(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const uploadImage = document("dhruv-images").single("Attachment");
      uploadImage(req, res, async (err) => {
        if (err) {
          return new appError("Image not found", 301);
        }
        //console.log(req.file);
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
        //console.log(documentFile.location);
        const document = await this._documentService.addDocument(documentType);
        return message.sendResponse(200, "image created", document, res);
      });
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getDocumentById(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const documentId = req.params.id;
      const getDocumets = await this._documentService.getDocumentById(
        documentId
      );
      if (getDocumets) {
        return message.sendResponse(200, "image find", getDocumets, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async updateDocument(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const updateId = req.params.id;
      const uploadImage = document("dhruv-images").single("Attachment");
      uploadImage(req, res, async (err: any) => {
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
        const updatedDocument = await this._documentService.updateDocument(
          updateId,
          documentType
        );
        if (updatedDocument) {
          return message.sendResponse(
            200,
            "updated successfully",
            updatedDocument,
            res
          );
        }
      });
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteDocument(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteId = req.params.id;
      const deleteDocument = await this._documentService.deleteDocument(
        deleteId
      );
      if (deleteDocument) {
        return message.sendResponseDelete(200, "Deleted successfully!", res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
