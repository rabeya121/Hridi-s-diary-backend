import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();

router.post("/", verifyJWT, createOrder);
router.get("/my", verifyJWT, getMyOrders);
router.get("/", verifyJWT, verifyAdmin, getAllOrders);
router.patch("/:id/status", verifyJWT, verifyAdmin, updateOrderStatus);

export default router;