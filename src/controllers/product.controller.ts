import { Request, Response } from "express";
import Product from "../models/Product";

// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      sort,
      page = "1",
      limit = "12",
    } = req.query;

    const query: Record<string, unknown> = {};

    if (search) {
      query.title = { $regex: search as string, $options: "i" };
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

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// @desc    Create a new product (admin only)
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating product" });
  }
};

// @desc    Delete a product (admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};