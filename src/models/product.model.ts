import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      required: "Please enter product name",
    },
    prodPrice: {
      type: Number,
      required: "Please enter product price",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
