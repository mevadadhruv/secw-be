import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import userModel from "../models/user.model";
import { CreateUser, UpdateUser, GetUser } from "../types/userTypes";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
var mongoose = require("mongoose");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

@injectable()
export default class UserRepository implements IUserRepository {
  constructor() {}

  async createUser(user: CreateUser): Promise<GetUser> {
    try {
      const emailId = user.emailId;
      const password = user.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password?.toString(), salt);
      const res = await userModel.create({ emailId, password: hashPassword });
      const id = res.id;
      const email = res.emailId;
      const pass = res.password;
      return { id: id, emailId: email, password: pass };
    } catch (err) {
      console.log("inside repository createUser", err);
      throw new Error("inside repository createUser" + err);
    }
  }

  async getUser() {
    try {
      const res = await userModel.find();
      return res;
    } catch (err) {
      console.log("inside repository getUser", err);
      throw new Error("inside repository getUser" + err);
    }
  }

  async getUserbyId(id: String): Promise<GetUser> {
    try {
      id = mongoose.mongo.ObjectId(id);
      console.log("id- ", id);
      const res = await userModel.findById(id);
      const _id = res?.id;
      const email = res?.emailId;
      const pass = res?.password;
      return { id: _id, emailId: email, password: pass };
    } catch (err) {
      console.log("inside repository getUserbyid", err);
      throw new Error("inside repository getUserbyid" + err);
    }
  }

  async updateUser(id: String, user: UpdateUser): Promise<GetUser> {
    try {
      const res = await userModel.findByIdAndUpdate(id, user);
      //const _id = res?._id
      const email = res?.emailId;
      const pass = res?.password;
      return { emailId: email, password: pass };
    } catch (err) {
      console.log("inside repository updateUser", err);
      throw new Error("inside repository updateUser" + err);
    }
  }

  async deleteUser(id: String): Promise<GetUser> {
    try {
      const res = await userModel.findByIdAndDelete(id);
      const _id = res?.id;
      const email = res?.emailId;
      const password = res?.password;
      return { id: _id, emailId: email, password: password };
    } catch (err) {
      console.log("inside repository deleteUser", err);
      throw new Error("inside repository deleteUser" + err);
    }
  }

  async loginUser(user: CreateUser): Promise<GetUser> {
    try {
      const emailId = user.emailId;
      const password = user.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password?.toString(), salt);
      const userCheck = await userModel.findOne({
        emailId: emailId,
        password: hashPassword,
      });
      const id = userCheck?.id;
      console.log(userCheck);
      return { id: id, emailId, password };
    } catch (err) {
      console.log("inside repository loginUser", err);
      throw new Error("inside repository loginUser" + err);
    }
  }
}
