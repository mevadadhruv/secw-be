import mongoose, { Schema, Types } from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: "Please enter quantity",
    },
    itemPrice: {
      type: Number,
      required: "Please provide item price",
    },
    itemTotal: {
      type: Number,
      required: "Please enter item total",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
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

export default mongoose.model("OrderDetail", orderDetailSchema);
