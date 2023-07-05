import express from "express";
import DocumentController from "../controllers/DocumentController";

const documentController = new DocumentController();

const DocumentRouter = express.Router();

DocumentRouter.post("/UploadImage",(req,res,next)=>documentController.AddDocument(req,res,next));
DocumentRouter.get("/uploadImage/:id",(req,res,next)=>documentController.getDocumentById(req,res,next));
DocumentRouter.put("/uploadImage/:id",(req,res,next)=>documentController.UpdateDocument(req,res,next));
DocumentRouter.delete("/uploadImage/:id",(req,res,next)=>documentController.DeleteDocument(req,res,next));

export default DocumentRouter;