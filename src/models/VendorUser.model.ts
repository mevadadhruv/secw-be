import mongoose from "mongoose";

const VendorUserSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Userschema"
    },
    VendorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "VendorSchmea"
    }
});

export default mongoose.model("VendorUser",VendorUserSchema);