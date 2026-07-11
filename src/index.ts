import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import comboRoutes from "./routes/combo.routes";
import reviewRoutes from "./routes/review.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";



dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/combos", comboRoutes);
app.use("/api/reviews", reviewRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("🎀 Hridi's Diary API is running");
});

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server after DB connects
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();