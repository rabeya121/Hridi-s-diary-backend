import { Response } from "express";
import Order from "../models/Order";
import { AuthRequest } from "../middlewares/verifyJWT";

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, totalPrice, address, phone } = req.body;

    if (!items || items.length === 0 || !totalPrice || !address || !phone) {
      res.status(400).json({ message: "Missing required order fields" });
      return;
    }

    const order = await Order.create({
      userId: req.user?.id,
      items,
      totalPrice,
      address,
      phone,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error placing order" });
  }
};

// @desc    Get logged-in user's own orders
// @route   GET /api/orders/my
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc    Update order status (admin only)
// @route   PATCH /api/orders/:id/status
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating order" });
  }
};