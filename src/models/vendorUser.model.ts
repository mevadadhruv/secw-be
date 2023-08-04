import mongoose from "mongoose";

const vendorUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  VendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

export default mongoose.model("VendorUser", vendorUserSchema);
