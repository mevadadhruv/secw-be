import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userschema",
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentSchema",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
