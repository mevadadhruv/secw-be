import { inject, injectable } from "inversify";
import { IDocumentService } from "../interfaces/IDocumentService";
import { documentType, getDocument } from "../types/userTypes";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { types } from "../config/types";

@injectable()
export default class DocumentService implements IDocumentService {
  private _documentRepository: IDocumentRepository;

  constructor(
    @inject(types.IDocumentRepository) documentRepository: IDocumentRepository
  ) {
    this._documentRepository = documentRepository;
  }

  async addDocument(document: documentType): Promise<getDocument> {
    try {
      const addDocument = await this._documentRepository.addDocument(document);
      return addDocument;
    } catch (err) {
      throw new Error(
        "internal server error in the add document service. :- " + err
      );
    }
  }

  getDocumentById(id: string): Promise<getDocument> {
    try {
      const getDocument = this._documentRepository.getDocumentById(id);
      return getDocument;
    } catch (err) {
      throw new Error(
        "internal server error in the document service. :- " + err
      );
    }
  }

  async updateDocument(
    id: string,
    document: documentType
  ): Promise<getDocument> {
    try {
      const updateDocument = await this._documentRepository.updateDocument(
        id,
        document
      );
      return updateDocument;
    } catch (err) {
      throw new Error(
        "internal server error in the update document service. :- " + err
      );
    }
  }

  async deleteDocument(id: string): Promise<getDocument> {
    try {
      const deleteDocument = await this._documentRepository.deleteDocument(id);
      return deleteDocument;
    } catch (err) {
      throw new Error(
        "internal server error in the delete document service. :- " + err
      );
    }
  }
}
