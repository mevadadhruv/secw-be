import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter role name",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
