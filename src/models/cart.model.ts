import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
