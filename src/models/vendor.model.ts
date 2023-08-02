import mongoose from "mongoose";

const vendorSchmea = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchmea);
