"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Something went wrong on the server",
    });
};
exports.errorHandler = errorHandler;
// 404 handler for unknown routes
const notFoundHandler = (req, res) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};
exports.notFoundHandler = notFoundHandler;
