import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  REGION : process.env.REGION,
  ACCESS_KEY_ID : process.env.ACCESSKEYID,
  SECRET_KEY_ACCESS : process.env.SECRETKEYACCESS
};