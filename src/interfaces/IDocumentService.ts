import { getDocument, documentType } from "../types/userTypes";

export interface IDocumentService {
  addDocument(document: documentType): Promise<getDocument>;
  getDocumentById(id: string): Promise<getDocument>;
  updateDocument(id: string, document: documentType): Promise<getDocument>;
  deleteDocument(id: string): Promise<getDocument>;
}
