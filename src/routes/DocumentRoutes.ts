import express from "express";
import DocumentController from "../controllers/DocumentController";
import { iocContainer as Container } from "../config/container";
import { IDocumentService } from "../interfaces/IDocumentService";
import { types } from "../config/types";

const documentService = Container.get<IDocumentService>(types.IDocumentService);
const documentController = new DocumentController(documentService);

const DocumentRouter = express.Router();

DocumentRouter.post("/UploadImage",(req,res,next)=>documentController.AddDocument(req,res,next));
DocumentRouter.get("/uploadImage/:id",(req,res,next)=>documentController.getDocumentById(req,res,next));
DocumentRouter.put("/uploadImage/:id",(req,res,next)=>documentController.UpdateDocument(req,res,next));
DocumentRouter.delete("/uploadImage/:id",(req,res,next)=>documentController.DeleteDocument(req,res,next));

export default DocumentRouter;