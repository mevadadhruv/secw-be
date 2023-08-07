import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    shippingType: {
      type: String,
    },
    shippingCharge: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shipping", shippingSchema);
