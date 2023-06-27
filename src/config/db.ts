import mongoose from "mongoose";
import * as dotenv from "dotenv";

export function DatabaseConnection():any{
    dotenv.config();

    const DBstring:string = `${String(process.env.DB)}`;

    mongoose.connect(DBstring).then(()=>{
        console.log('connected sucessfully!!')
    }).catch(err=>{
        console.log(err)
    });
}