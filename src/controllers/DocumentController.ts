import express, { NextFunction } from "express";
import sendErrorProd from "../Error/globalErrorHandler";
import document from "../config/Document";
import documentModel from "../models/document.model";
const message = require("../Error/globalSuccessHandler");
import AppError from "../Error/AppError";

export default class DocumentController {

    async AddDocument(req: express.Request, res: express.Response, next: NextFunction) {
        try {
            const uploadImage  = document('dhruv-images').single("Attachment");
            uploadImage(req, res, async (err) => {
                if (err) {
                    return new AppError("Image not found", 301);
                }
                //console.log(req.file);
                const documentFile : any = req.file;
                //console.log(documentFile.location);
                const document = await documentModel.create({Attachment:documentFile.location, description: req.file.encoding, Extension: req.file.mimetype, Size: req.file.size, name: req.file.originalname });
                return message.sendResponse(200, "image created", document, res);
            })
        }
        catch (err) {
            return sendErrorProd(err, req, res);
        }
    }

    async getDocumentById(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const documentId = req.params.id;
            const getDocumets = await documentModel.findById(documentId);
            if(getDocumets){
                return message.sendResponse(200,"image find",getDocumets,res);
            }
        }
        catch(err){
            return sendErrorProd(err,req,res);
        }
    }

    async UpdateDocument(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const updateId = req.params.id;
            const uploadImage  = document('dhruv-images').single("Attachment");
            uploadImage(req,res,async(err)=>{
                if (err) {
                    return new AppError("Image not found", 301);
                }
                const documentFile : any = req.file;
                const updatedDOcument = await documentModel.findByIdAndUpdate(updateId,{Attachment:documentFile.location, description: req.file.encoding, Extension: req.file.mimetype, Size: req.file.size, name: req.file.originalname });
                if(updatedDOcument){
                    return message.sendResponse(200,"updated successfully",updatedDOcument,res);
                }
            })
        }
        catch(err){
            return sendErrorProd(err,req,res);
        }
    }
    
    async DeleteDocument(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const deleteId = req.params.id;
            const DeleteDocument = await documentModel.findByIdAndDelete(deleteId);
            if(DeleteDocument){
                return message.sendResponseDelete(200,"Deleted successfully!",res);
            }
        }
        catch(err){
            return sendErrorProd(err,req,res);
        }
    }
}