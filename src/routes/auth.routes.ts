import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getMe);

export default router;