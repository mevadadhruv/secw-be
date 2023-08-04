import mongoose from "mongoose";

const vendorSchmea = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchmea);
