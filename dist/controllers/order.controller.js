"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
    try {
        const { items, totalPrice, address, phone, paymentMethod } = req.body;
        if (!items || items.length === 0 || !totalPrice || !address || !phone) {
            res.status(400).json({ message: "Missing required order fields" });
            return;
        }
        const order = await Order_1.default.create({
            userId: req.user?.id,
            items,
            totalPrice,
            address,
            phone,
            paymentMethod: paymentMethod || "Cash on Delivery",
        });
        res.status(201).json({ message: "Order placed successfully", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error placing order" });
    }
};
exports.createOrder = createOrder;
// @desc    Get logged-in user's own orders
// @route   GET /api/orders/my
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find({ userId: req.user?.id }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};
exports.getMyOrders = getMyOrders;
// @desc    Get all orders (admin only)
// @route   GET /api/orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};
exports.getAllOrders = getAllOrders;
// @desc    Update order status (admin only)
// @route   PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({ message: "Order status updated", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error updating order" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
