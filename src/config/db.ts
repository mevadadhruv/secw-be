import mongoose from "mongoose";
import * as dotenv from "dotenv";

export function DatabaseConnection(): any {
  dotenv.config();

  const dbString: string = `${String(process.env.DB)}`;

  mongoose
    .connect(dbString)
    .then(() => {
      console.log("connected sucessfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
}
