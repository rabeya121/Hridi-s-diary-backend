import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  category: "skincare" | "haircare" | "undergarments";
  shortDescription: string;
  fullDescription: string;
  price: number;
  discountPrice?: number;
  images: string[];
  specs: {
    skinType?: string;
    size?: string;
    brand?: string;
    material?: string;
  };
  rating: number;
  reviewCount: number;
  stock: number;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["skincare", "haircare", "undergarments"],
    required: [true, "Category is required"],
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
  },
  fullDescription: {
    type: String,
    required: [true, "Full description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
  },
  images: {
    type: [String],
    default: [],
  },
  specs: {
    skinType: String,
    size: String,
    brand: String,
    material: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;