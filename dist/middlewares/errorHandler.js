"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ success: false, message });
};
exports.errorHandler = errorHandler;
