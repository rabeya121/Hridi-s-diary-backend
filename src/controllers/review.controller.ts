import { Response, Request } from "express";
import Review from "../models/Review";
import Product from "../models/Product";
import Combo from "../models/Combo";
import User from "../models/User";
import { AuthRequest } from "../middlewares/verifyJWT";

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching reviews" });
  }
};

// @desc    Get all reviews for a combo
// @route   GET /api/reviews/combo/:comboId
export const getComboReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ comboId: req.params.comboId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching reviews" });
  }
};

// @desc    Add a review to a product or combo (logged-in users only)
// @route   POST /api/reviews
export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, comboId, rating, comment } = req.body;

    if ((!productId && !comboId) || !rating || !comment) {
      res.status(400).json({ message: "productId or comboId, rating, and comment are required" });
      return;
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
    }

    if (comboId) {
      const combo = await Combo.findById(comboId);
      if (!combo) {
        res.status(404).json({ message: "Combo not found" });
        return;
      }
    }

    const user = await User.findById(req.user?.id);

    const review = await Review.create({
      productId: productId || undefined,
      comboId: comboId || undefined,
      userId: req.user?.id,
      userName: user?.name || "Anonymous",
      rating,
      comment,
    });

    // Only products maintain an aggregate rating/reviewCount for now
    if (productId) {
      const allReviews = await Review.find({ productId });
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = totalRating / allReviews.length;

      await Product.findByIdAndUpdate(productId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      });
    }

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error adding review" });
  }
};