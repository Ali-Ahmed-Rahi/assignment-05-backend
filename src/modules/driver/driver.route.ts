import express from "express";
import * as driverController from "./driver.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = express.Router();

// Admin approves a driver
router.patch("/:id/approve", authMiddleware, authorize("admin"), driverController.approveDriver);

// Admin suspends a driver
router.patch("/:id/suspend", authMiddleware, authorize("admin"), driverController.suspendDriver);

// Get all drivers (admin)
router.get("/", authMiddleware, authorize("admin"), driverController.getAllDrivers);

// Get a driver by ID (admin)
router.get("/:id", authMiddleware, authorize("admin"), driverController.getDriverById);

export default router;
