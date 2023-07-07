import { inject, injectable } from "inversify";
import { IDocumentService } from "../interfaces/IDocumentService";
import { DocumentType, GetDocument } from "../types/userTypes";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { types } from "../config/types";

@injectable()
export default class DocumentService implements IDocumentService{
private _documentRepository : IDocumentRepository;

    constructor(@inject(types.IDocumentRepository) documentRepository : IDocumentRepository){
        this._documentRepository = documentRepository;
    }

    async AddDocument(document: DocumentType): Promise<GetDocument> {
        try{
            const addDocument = await this._documentRepository.AddDocument(document);
            return addDocument;
        }
        catch(err){
            throw err;
        }
    }
    
    getDocumentById(id: string): Promise<GetDocument> {
        try{
            const getDocument = this._documentRepository.getDocumentById(id);
            return getDocument;
        }
        catch(err){
            throw err;
        }
    }
    
    async UpdateDocument(id: string, document: DocumentType): Promise<GetDocument> {
        try{
            const UpdateDocument = await this._documentRepository.UpdateDocument(id,document);
            return UpdateDocument;
        }
        catch(err){
            throw err;
        }
    }
    
    async DeleteDocument(id: string): Promise<GetDocument> {
        try{
            const deleteDocument = await this._documentRepository.DeleteDocument(id);
            return deleteDocument;
        }
        catch(err){
            throw err;
        }
    }
}