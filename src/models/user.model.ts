import mongoose, { Schema, Types } from "mongoose";

const Userschema = new mongoose.Schema({
    emailId : {
        type:String,
        required:'Please enter email'
    },
    password : {
        type:String,
        required:'please enter password'
    }
});

export default mongoose.model('User',Userschema);