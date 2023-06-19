import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

const salt_factor = 10;

const Userschema = new mongoose.Schema({
    emailId : {
        type:String,
        required:'Please enter email'
    },
    password : {
        type:String,
        required:'please enter password'
    },
    lastLoginAt : {
        type: Date,
        default:null
    }
},{
    timestamps : true
});
     
export default mongoose.model('User',Userschema);