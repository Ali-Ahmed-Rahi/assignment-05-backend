"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("✅ MongoDB connected");
    app_1.default.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
});
