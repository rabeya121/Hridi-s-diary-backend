import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import comboRoutes from "./routes/combo.routes";
import reviewRoutes from "./routes/review.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;


const allowedOrigins = [
  "http://localhost:3000",
  "https://hridis-diary-frontend.vercel.app",
];
// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Ensure DB is connected before handling any request (serverless-safe)
app.use(async (req: Request, res: Response, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/combos", comboRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("🎀 Hridi's Diary API is running!!!");
});

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Local dev only — Vercel is serverless, it never calls this
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
}

export default app; // <-- Vercel needs this default export