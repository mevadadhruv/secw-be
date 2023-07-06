import {GetDocument,DocumentType} from "../types/userTypes";

export interface IDocumentService{
    AddDocument(document:DocumentType):Promise<GetDocument>;
    getDocumentById(id:string):Promise<GetDocument>;
    UpdateDocument(id:string,document:DocumentType):Promise<GetDocument>;
    DeleteDocument(id:string):Promise<GetDocument>;
}