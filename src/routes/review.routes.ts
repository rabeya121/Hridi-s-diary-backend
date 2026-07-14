import { Router } from "express";
import { getProductReviews, getComboReviews, addReview } from "../controllers/review.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/product/:productId", getProductReviews);
router.get("/combo/:comboId", getComboReviews);
router.post("/", verifyJWT, addReview);

export default router;