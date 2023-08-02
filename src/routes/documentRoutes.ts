import express from "express";
import DocumentController from "../controllers/documentController";
import { iocContainer as Container } from "../config/container";
import { IDocumentService } from "../interfaces/IDocumentService";
import { types } from "../config/types";

const documentService = Container.get<IDocumentService>(types.IDocumentService);
const documentController = new DocumentController(documentService);

const documentRouter = express.Router();

documentRouter.post("/UploadImage", (req, res, next) =>
  documentController.addDocument(req, res, next)
);
documentRouter.get("/uploadImage/:id", (req, res, next) =>
  documentController.getDocumentById(req, res, next)
);
documentRouter.put("/uploadImage/:id", (req, res, next) =>
  documentController.updateDocument(req, res, next)
);
documentRouter.delete("/uploadImage/:id", (req, res, next) =>
  documentController.deleteDocument(req, res, next)
);

export default documentRouter;
