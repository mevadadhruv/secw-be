import mongoose from "mongoose";

export declare type createUser = {
  emailId: String;
  password: string;
  token?: string;
};

export declare type updateUser = {
  emailId: String;
  password: String;
};

export declare type getUser = {
  id?: String;
  emailId?: String;
  password?: String;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
};

export declare type registerUser = {
  address?: String;
  firstName: String | undefined;
  lastName: String | undefined;
  phoneNumber?: String;
  emailId?: String;
  password?: String;
  userId?: String;
  sId?: String;
};

export declare type getRegisterUser = {
  id?: String;
  address?: String;
  firstName?: String;
  lastName?: String;
  phoneNumber?: String;
  emailId?: String;
  password?: String;
};

export declare type documentType = {
  id?: string;
  name: string;
  description: string;
  attachment: string;
  extension: string;
  size: string;
};

export declare type getDocument = {
  id: string;
  name: string;
  description: string;
  attachment: string;
  extension: string;
  size: string;
};

export declare type Vendor = {
  id?: string;
  name: string;
  logo: string;
};

export declare type getVendor = {
  id?: string;
  name: string;
  logo: string;
};

export declare type role = {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export declare type Country = {
  id?: string;
  name?: string;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export declare type permission = {
  id?: string;
  name?: String;
  description?: String;
};

export declare type category = {
  id?: string;
  name?: String;
  categoryId?: mongoose.Types.ObjectId | null;
};

export declare type product = {
  id?: string;
  prodName?: String;
  prodPrice?: Number;
  categoryId?: mongoose.mongo.BSON.ObjectId;
  // documentId?: mongoose.mongo.BSON.ObjectId | null;
};
export declare type updateProduct = {
  prodName?: String;
  prodPrice?: Number;
  categoryId?: mongoose.mongo.BSON.ObjectId;
  // documentId?: mongoose.mongo.BSON.ObjectId | null;
};

export declare type cart = {
  id?: string;
  quantity?: Number;
  productId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
};

export declare type createUpdateCartInput = {
  quantity?: Number;
  productId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
};
