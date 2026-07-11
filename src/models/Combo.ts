import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICombo extends Document {
  title: string;
  occasion: "valentines" | "eid" | "christmas" | "puja" | "general";
  products: Types.ObjectId[];
  description: string;
  images: string[];
  originalPrice: number;
  comboPrice: number;
  discountPercent: number;
  validFrom?: Date;
  validTo?: Date;
  isActive: boolean;
  createdAt: Date;
}

const comboSchema = new Schema<ICombo>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  occasion: {
    type: String,
    enum: ["valentines", "eid", "christmas", "puja", "general"],
    required: [true, "Occasion is required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  images: {
    type: [String],
    default: [],
  },
  originalPrice: {
    type: Number,
    required: [true, "Original price is required"],
    min: 0,
  },
  comboPrice: {
    type: Number,
    required: [true, "Combo price is required"],
    min: 0,
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  validFrom: {
    type: Date,
  },
  validTo: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Combo = mongoose.model<ICombo>("Combo", comboSchema);

export default Combo;