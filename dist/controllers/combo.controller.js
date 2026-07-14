"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCombo = exports.createCombo = exports.getComboById = exports.getCombos = void 0;
const Combo_1 = __importDefault(require("../models/Combo"));
// @desc    Get all combos (optionally filtered by occasion)
// @route   GET /api/combos
const getCombos = async (req, res) => {
    try {
        const { occasion } = req.query;
        const query = { isActive: true };
        if (occasion) {
            query.occasion = occasion;
        }
        const combos = await Combo_1.default.find(query)
            .populate("products", "title images price category")
            .sort({ createdAt: -1 });
        res.status(200).json({ combos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching combos" });
    }
};
exports.getCombos = getCombos;
// @desc    Get single combo by ID
// @route   GET /api/combos/:id
const getComboById = async (req, res) => {
    try {
        const combo = await Combo_1.default.findById(req.params.id).populate("products", "title images price category shortDescription");
        if (!combo) {
            res.status(404).json({ message: "Combo not found" });
            return;
        }
        res.status(200).json({ combo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching combo" });
    }
};
exports.getComboById = getComboById;
// @desc    Create a new combo (admin only)
// @route   POST /api/combos
const createCombo = async (req, res) => {
    try {
        const combo = await Combo_1.default.create(req.body);
        res.status(201).json({ message: "Combo created", combo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error creating combo" });
    }
};
exports.createCombo = createCombo;
// @desc    Delete a combo (admin only)
// @route   DELETE /api/combos/:id
const deleteCombo = async (req, res) => {
    try {
        const combo = await Combo_1.default.findByIdAndDelete(req.params.id);
        if (!combo) {
            res.status(404).json({ message: "Combo not found" });
            return;
        }
        res.status(200).json({ message: "Combo deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error deleting combo" });
    }
};
exports.deleteCombo = deleteCombo;
