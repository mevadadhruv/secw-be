import mongoose from "mongoose";

const vendorUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  VendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendorSchmea",
  },
});

export default mongoose.model("VendorUser", vendorUserSchema);
