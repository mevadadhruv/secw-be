import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderStatus: {
      type: String,
      required: "Please enter order status",
    },
    orderDate: {
      type: Date,
      required: "Please enter order date",
    },
    total: {
      type: Number,
      required: "Please provide total",
    },
    subTotal: {
      type: Number,
      required: "Please enter sub total",
    },
    shippingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
    },
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
