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
      ref: "userSchema",
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "documentSchema",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
