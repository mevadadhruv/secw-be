import mongoose, { Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: "Please enter email",
    },
    password: {
      type: String,
      required: "please enter password",
    },
    token: {
      type: String,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
