import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import appError from "../error/appError";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
    } catch (err) {
      next(new appError("invalid token", 402));
    }
  }
  if (!token) {
    next(new appError("PLease Login First to continue", 403));
  }
  return next();
};
