import { injectable } from "inversify";
import { IDocumentService } from "../interfaces/IDocumentService";
import { DocumentType, GetDocument } from "../types/userTypes";

@injectable()
export default class DocumentService implements IDocumentService{
    AddDocument(document: DocumentType): Promise<GetDocument> {
        throw new Error("Method not implemented.");
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


}