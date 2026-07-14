"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getComboReviews = exports.getProductReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Product_1 = __importDefault(require("../models/Product"));
const Combo_1 = __importDefault(require("../models/Combo"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ productId: req.params.productId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ reviews });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching reviews" });
    }
};
exports.getProductReviews = getProductReviews;
// @desc    Get all reviews for a combo
// @route   GET /api/reviews/combo/:comboId
const getComboReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ comboId: req.params.comboId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ reviews });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching reviews" });
    }
};
exports.getComboReviews = getComboReviews;
// @desc    Add a review to a product or combo (logged-in users only)
// @route   POST /api/reviews
const addReview = async (req, res) => {
    try {
        const { productId, comboId, rating, comment } = req.body;
        if ((!productId && !comboId) || !rating || !comment) {
            res.status(400).json({ message: "productId or comboId, rating, and comment are required" });
            return;
        }
        if (productId) {
            const product = await Product_1.default.findById(productId);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
        }
        if (comboId) {
            const combo = await Combo_1.default.findById(comboId);
            if (!combo) {
                res.status(404).json({ message: "Combo not found" });
                return;
            }
        }
        const user = await User_1.default.findById(req.user?.id);
        const review = await Review_1.default.create({
            productId: productId || undefined,
            comboId: comboId || undefined,
            userId: req.user?.id,
            userName: user?.name || "Anonymous",
            rating,
            comment,
        });
        // Only products maintain an aggregate rating/reviewCount for now
        if (productId) {
            const allReviews = await Review_1.default.find({ productId });
            const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
            const avgRating = totalRating / allReviews.length;
            await Product_1.default.findByIdAndUpdate(productId, {
                rating: Math.round(avgRating * 10) / 10,
                reviewCount: allReviews.length,
            });
        }
        res.status(201).json({ message: "Review added", review });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error adding review" });
    }
};
exports.addReview = addReview;
