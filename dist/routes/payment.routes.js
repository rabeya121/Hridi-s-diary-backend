"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const router = (0, express_1.Router)();
router.post("/create-checkout-session", verifyJWT_1.verifyJWT, payment_controller_1.createCheckoutSession);
router.get("/verify-session/:sessionId", verifyJWT_1.verifyJWT, payment_controller_1.verifySession);
exports.default = router;
