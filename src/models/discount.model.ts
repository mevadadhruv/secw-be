import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    discountType: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Discount", discountSchema);
