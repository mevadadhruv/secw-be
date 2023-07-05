import documentModel from "../models/document.model";
import { GetDocument ,DocumentType} from "../types/userTypes";
import document from "../config/Document";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { injectable } from "inversify";

@injectable()
export default class DocumentRepository implements IDocumentRepository{
    
    constructor(){

    }
    getDocumentById(id: string): Promise<GetDocument> {
        throw new Error("Method not implemented.");
    }
    UpdateDocument(id: string, document: DocumentType): Promise<GetDocument> {
        throw new Error("Method not implemented.");
    }
    DeleteDocument(id: string): Promise<GetDocument> {
        throw new Error("Method not implemented.");
    }

    async AddDocument(documentFile:DocumentType):Promise<GetDocument>{
        throw new Error("");
    }
}