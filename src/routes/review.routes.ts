import { Router } from "express";
import { getProductReviews, addReview } from "../controllers/review.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/:productId", getProductReviews);
router.post("/", verifyJWT, addReview);

export default router;