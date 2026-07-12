import { Router } from "express";
import { registerUser, loginUser, getMe, googleAuth } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/me", verifyJWT, getMe);

export default router;