import documentModel from "../models/document.model";
import { getDocument, documentType } from "../types/userTypes";
import document from "../config/document";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";
import { injectable } from "inversify";

@injectable()
export default class DocumentRepository implements IDocumentRepository {
  constructor() {}

  async addDocument(documentFile: documentType): Promise<getDocument> {
    try {
      const name = documentFile.name;
      const description = documentFile.description;
      const extension = documentFile.extension;
      const attachment = documentFile.attachment;
      const size = documentFile.size;
      const addDocument = await documentModel.create({
        name: name,
        description: description,
        Extension: extension,
        Attachment: attachment,
        Size: size,
      });
      console.log("add document", addDocument);
      return {
        id: addDocument.id,
        name: addDocument.name,
        description: addDocument.description,
        attachment: addDocument.Attachment,
        extension: addDocument.Extension,
        size: addDocument.Size,
      };
    } catch (err) {
      throw err;
    }
  }

  async getDocumentById(id: string): Promise<getDocument> {
    try {
      const getDocument = await documentModel.findById(id);
      return {
        id: getDocument.id,
        name: getDocument.name,
        extension: getDocument.Extension,
        attachment: getDocument.Attachment,
        description: getDocument.description,
        size: getDocument.Size,
      };
    } catch (err) {
      throw err;
    }
  }

  async updateDocument(
    id: string,
    document: documentType
  ): Promise<getDocument> {
    try {
      const updateDocument = await documentModel.findByIdAndUpdate(
        id,
        document
      );
      return {
        id: updateDocument.id,
        name: updateDocument.name,
        extension: updateDocument.Extension,
        attachment: updateDocument.Attachment,
        description: updateDocument.description,
        size: updateDocument.Size,
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteDocument(id: string): Promise<getDocument> {
    try {
      const deleteDocument = await documentModel.findByIdAndDelete(id);
      return {
        id: deleteDocument.id,
        name: deleteDocument.name,
        extension: deleteDocument.Extension,
        attachment: deleteDocument.Attachment,
        description: deleteDocument.description,
        size: deleteDocument.Size,
      };
    } catch (err) {
      throw err;
    }
  }
}
