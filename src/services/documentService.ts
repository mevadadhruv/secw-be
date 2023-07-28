import { inject, injectable } from "inversify";
import { IDocumentService } from "../interfaces/IDocumentService";
import { documentType, getDocument } from "../types/userTypes";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { types } from "../config/types";

@injectable()
export default class DocumentService implements IDocumentService{
private _documentRepository : IDocumentRepository;

    constructor(@inject(types.IDocumentRepository) documentRepository : IDocumentRepository){
        this._documentRepository = documentRepository;
    }

    async addDocument(document: documentType): Promise<getDocument> {
        try{
            const addDocument = await this._documentRepository.addDocument(document);
            return addDocument;
        }
        catch(err){
            console.log("inside service add document", err);
            throw new Error("inside service add document" + err);
        }
    }
    
    getDocumentById(id: string): Promise<getDocument> {
        try{
            const getDocument = this._documentRepository.getDocumentById(id);
            return getDocument;
        }
        catch(err){
            console.log("inside service get document", err);
            throw new Error("inside service get document" + err);
        }
    }
    
    async updateDocument(id: string, document: documentType): Promise<getDocument> {
        try{
            const UpdateDocument = await this._documentRepository.updateDocument(id,document);
            return UpdateDocument;
        }
        catch(err){
            console.log("inside service update document", err);
            throw new Error("inside service update document" + err);
        }
    }
    
    async deleteDocument(id: string): Promise<getDocument> {
        try{
            const deleteDocument = await this._documentRepository.deleteDocument(id);
            return deleteDocument;
        }
        catch(err){
            console.log("inside service delete document", err);
            throw new Error("inside service delete document" + err);
        }
    }
}