import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  productId?: Types.ObjectId;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
  paymentMethod: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      title: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
  },
  status: {
    type: String,
    enum: ["pending", "processing", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;