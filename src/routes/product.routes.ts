import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", verifyJWT, verifyAdmin, createProduct);
router.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);

export default router;