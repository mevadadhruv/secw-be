import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    Attachment : {
        type : String
    },
    Extension : {
        type : String
    },
    Size : {
        type : String
    }
},{
    timestamps : true
});

export default mongoose.model("Document",DocumentSchema);