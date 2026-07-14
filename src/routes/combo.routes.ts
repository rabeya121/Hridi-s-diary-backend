import { Router } from "express";
import {
  getCombos,
  getComboById,
  createCombo,
  deleteCombo,
} from "../controllers/combo.controller";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyAdmin } from "../middlewares/verifyAdmin";


const router = Router();
router.get("/", getCombos);
router.get("/:id", getComboById);
router.post("/", verifyJWT, verifyAdmin, createCombo);
router.delete("/:id", verifyJWT, verifyAdmin, deleteCombo);

export default router;