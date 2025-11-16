import express from "express";
import { register, login, logout, getMe } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.schema";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout",logout)
router.get("/me",getMe)

export default router;
