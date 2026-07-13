import { Router } from "express";
import { createCheckoutSession, verifySession } from "../controllers/payment.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.post("/create-checkout-session", verifyJWT, createCheckoutSession);
router.get("/verify-session/:sessionId", verifyJWT, verifySession);

export default router;