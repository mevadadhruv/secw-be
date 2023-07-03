import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.CALLBACK_URL,
  facebook_api_key: process.env.facebook_api_key,
  facebook_api_secret: process.env.facebook_api_secret,
  callback_url: process.env.callback_url,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
