import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("❌ Error:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server",
  });
};

// 404 handler for unknown routes
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};