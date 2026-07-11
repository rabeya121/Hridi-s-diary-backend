import { Request, Response } from "express";
import Combo from "../models/Combo";

// @desc    Get all combos (optionally filtered by occasion)
// @route   GET /api/combos
export const getCombos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { occasion } = req.query;

    const query: Record<string, unknown> = { isActive: true };
    if (occasion) {
      query.occasion = occasion;
    }

    const combos = await Combo.find(query)
      .populate("products", "title images price category")
      .sort({ createdAt: -1 });

    res.status(200).json({ combos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching combos" });
  }
};

// @desc    Get single combo by ID
// @route   GET /api/combos/:id
export const getComboById = async (req: Request, res: Response): Promise<void> => {
  try {
    const combo = await Combo.findById(req.params.id).populate(
      "products",
      "title images price category shortDescription"
    );

    if (!combo) {
      res.status(404).json({ message: "Combo not found" });
      return;
    }

    res.status(200).json({ combo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching combo" });
  }
};

// @desc    Create a new combo (admin only)
// @route   POST /api/combos
export const createCombo = async (req: Request, res: Response): Promise<void> => {
  try {
    const combo = await Combo.create(req.body);
    res.status(201).json({ message: "Combo created", combo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating combo" });
  }
};

// @desc    Delete a combo (admin only)
// @route   DELETE /api/combos/:id
export const deleteCombo = async (req: Request, res: Response): Promise<void> => {
  try {
    const combo = await Combo.findByIdAndDelete(req.params.id);

    if (!combo) {
      res.status(404).json({ message: "Combo not found" });
      return;
    }

    res.status(200).json({ message: "Combo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting combo" });
  }
};