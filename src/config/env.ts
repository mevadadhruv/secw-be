import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.GCALLBACK_URL,
  FACEBOOK_API_KEY: process.env.FACEBOOK_API_KEY,
  FACEBOOK_API_SECRET: process.env.FACEBOOK_API_SECRET,
  FCALLBACK_URL: process.env.FCALLBACK_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REGION: process.env.REGION,
  ACCESS_KEY_ID: process.env.ACCESSKEYID,
  SECRET_KEY_ACCESS: process.env.SECRETKEYACCESS,
};
