import express, { NextFunction } from "express";
import { inject, injectable } from "inversify";
import { createUser, updateUser } from "../types/userTypes";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import appError from "../error/appError";
import { sendErrorProd } from "../error/globalErrorHandler";
const message = require("../error/globalSuccessHandler");
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import userModel from "../models/user.model";
import { checking } from "../error/globalErrorHandler";
import bcrypt from "bcrypt";

@injectable()
export default class UserController {
  private UserService: IUserService;

  constructor(@inject(types.IUserService) userService: IUserService) {
    this.UserService = userService;
  }

  async createUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const user: createUser = {
        emailId: req.body.emailId,
        password: req.body.password,
      };
      const service = await this.UserService.createUser(user);
      return message.sendResponse(
        200,
        "user created successfully",
        service,
        res
      );
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const users = await this.UserService.getUser();
      if (users) {
        return message.sendResponseGet(200, users, res);
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async getUserbyId(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const user = await this.UserService.getUserbyId(req.params.id);
      return message.sendResponseGet(200, user, res);
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async updateUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const User: updateUser = {
        emailId: req.body.emailId,
        password: req.body.password,
      };
      const updateUser = await this.UserService.updateUser(req.params.id, User);
      if (!updateUser) {
        return new appError("no such user existed", 400);
      }
      if (updateUser) {
        const updatedUser = await this.UserService.getUserbyId(req.params.id);
        return message.sendResponse(
          200,
          "User updated successfully",
          updatedUser,
          res
        );
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async deleteUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const deleteUser = await this.UserService.deleteUser(req.params.id);
      return message.sendResponseDelete(200, "user deleted successfully!", res);
    } catch (err) {
      return checking(err, req, res, next);
    }
  }

  async loginUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const user: createUser = {
        emailId: req.body.emailId,
        password: req.body.password,
      };
      const email = user.emailId;
      const password = user.password;
      if (!(user.emailId && user.password)) {
        return res.status(400).json({ message: "field can`t be empty" });
      }
      const userCheck = await userModel.findOne({ emailId: user.emailId });
      if (
        userCheck &&
        (await bcrypt.compare(user.password, userCheck.password))
      ) {
        const token = jwt.sign({ email, password }, config.JWT_SECRET_KEY, {
          expiresIn: "3000m",
        });
        userCheck.token = token;
        return message.sendResponse(
          200,
          "user have been logged in!",
          userCheck,
          res
        );
      } else {
        next(new appError("Invalid credentials", 400));
      }
    } catch (err) {
      return checking(err, req, res, next);
    }
  }
}
