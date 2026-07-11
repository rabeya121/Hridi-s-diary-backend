import { Response, Request } from "express";
import Review from "../models/Review";
import Product from "../models/Product";
import User from "../models/User";
import { AuthRequest } from "../middlewares/verifyJWT";

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
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

// @desc    Add a review to a product (logged-in users only)
// @route   POST /api/reviews
export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      res.status(400).json({ message: "productId, rating, and comment are required" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const user = await User.findById(req.user?.id);

    const review = await Review.create({
      productId,
      userId: req.user?.id,
      userName: user?.name || "Anonymous",
      rating,
      comment,
    });

    // Recalculate product's average rating and review count
    const allReviews = await Review.find({ productId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / allReviews.length;

    product.rating = Math.round(avgRating * 10) / 10;
    product.reviewCount = allReviews.length;
    await product.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error adding review" });
  }
};