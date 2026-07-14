"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Admin access only" });
        return;
    }
    next();
};
exports.verifyAdmin = verifyAdmin;
