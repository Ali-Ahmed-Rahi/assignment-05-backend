"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./auth.schema");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.validateRequest)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/login", (0, validateRequest_1.validateRequest)(auth_schema_1.loginSchema), auth_controller_1.login);
exports.default = router;
