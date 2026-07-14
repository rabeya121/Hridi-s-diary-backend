"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const combo_routes_1 = __importDefault(require("./routes/combo.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middlewares
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
// Ensure DB is connected before handling any request (serverless-safe)
app.use(async (req, res, next) => {
    try {
        await (0, db_1.default)();
        next();
    }
    catch (err) {
        next(err);
    }
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/combos", combo_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/payments", payment_routes_1.default);
// Test route
app.get("/", (req, res) => {
    res.send("🎀 Hridi's Diary API is running");
});
// 404 handler (must be after all routes)
app.use(errorHandler_1.notFoundHandler);
// Global error handler (must be last)
app.use(errorHandler_1.errorHandler);
// Local dev only — Vercel is serverless, it never calls this
if (process.env.NODE_ENV !== "production") {
    (0, db_1.default)().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    });
}
exports.default = app; // <-- Vercel needs this default export
