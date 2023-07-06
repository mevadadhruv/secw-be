import mongoose from "mongoose";

const VendorSchmea = new mongoose.Schema({
    name : {
        type : String
    },
    logo : {
        type : String
    }
},{
    timestamps : true
});

export default mongoose.model("Vendor",VendorSchmea);