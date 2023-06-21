import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    Address : {
        type : String
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    phone_number : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Userschema"
    }
},{
    timestamps : true
});

export default mongoose.model('Profile',profileSchema);