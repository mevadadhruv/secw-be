import mongoose from "mongoose";

const ReviewModel = new mongoose.Schema({
    review : {
        type : String
    },
    reviewStar : {
        type : Number
    }
},{
    timestamps : true
});

export default mongoose.model('Review',ReviewModel);