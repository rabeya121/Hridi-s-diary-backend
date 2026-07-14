"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, rating, sort, page = "1", limit = "12", } = req.query;
        const query = {};
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {
                ...(minPrice ? { $gte: Number(minPrice) } : {}),
                ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
            };
        }
        if (rating) {
            query.rating = { $gte: Number(rating) };
        }
        let sortOption = { createdAt: -1 };
        if (sort === "price_asc")
            sortOption = { price: 1 };
        if (sort === "price_desc")
            sortOption = { price: -1 };
        if (sort === "rating")
            sortOption = { rating: -1 };
        if (sort === "newest")
            sortOption = { createdAt: -1 };
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const [products, total] = await Promise.all([
            Product_1.default.find(query).sort(sortOption).skip(skip).limit(limitNum),
            Product_1.default.countDocuments(query),
        ]);
        res.status(200).json({
            products,
            pagination: {
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching products" });
    }
};
exports.getProducts = getProducts;
// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching product" });
    }
};
exports.getProductById = getProductById;
// @desc    Create a new product (admin only)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const product = await Product_1.default.create(req.body);
        res.status(201).json({ message: "Product created", product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error creating product" });
    }
};
exports.createProduct = createProduct;
// @desc    Delete a product (admin only)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error deleting product" });
    }
};
exports.deleteProduct = deleteProduct;
