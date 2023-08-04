import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import userModel from "../models/user.model";
import { createUser, updateUser, getUser } from "../types/userTypes";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
var mongoose = require("mongoose");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

@injectable()
export default class UserRepository implements IUserRepository {
  async createUser(user: createUser): Promise<getUser> {
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
      throw err;
    }
  }

  async getUser() {
    try {
      const res = await userModel.find();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getUserbyId(id: String): Promise<getUser> {
    try {
      id = new mongoose.mongo.ObjectId(id);
      const res = await userModel.findById(id);
      const _id = res?.id;
      const email = res?.emailId;
      const pass = res?.password;
      return { id: _id, emailId: email, password: pass };
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: String, user: updateUser): Promise<getUser> {
    try {
      const res = await userModel.findByIdAndUpdate(id, user);
      //const _id = res?._id
      const email = res?.emailId;
      const pass = res?.password;
      return { emailId: email, password: pass };
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: String): Promise<getUser> {
    try {
      const res = await userModel.findByIdAndDelete(id);
      const _id = res?.id;
      const email = res?.emailId;
      const password = res?.password;
      return { id: _id, emailId: email, password: password };
    } catch (err) {
      throw err;
    }
  }

  async loginUser(user: createUser): Promise<getUser> {
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
      throw err;
    }
  }
}
