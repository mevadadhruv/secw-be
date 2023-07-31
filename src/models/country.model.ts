import mongoose, { Schema, Types } from "mongoose";

const Countryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter role name",
    },
    code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Country", Countryschema);
