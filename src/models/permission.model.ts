import mongoose, { Schema, Types } from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter role name",
    },
    description: {
      type: String,
      required: "Please enter role name",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Permission", permissionSchema);
