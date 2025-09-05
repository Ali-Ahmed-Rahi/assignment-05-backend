import { Router } from "express";
import * as driverController from "./driver.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Admin only
router.get("/", authMiddleware, authorize("admin"), driverController.getAllDrivers);
router.get("/:id", authMiddleware, authorize("admin"), driverController.getDriverById);
router.patch("/approve/:id", authMiddleware, authorize("admin"), driverController.approveDriver);
router.patch("/suspend/:id", authMiddleware, authorize("admin"), driverController.suspendDriver);

// Driver only
router.patch("/availability/:id", authMiddleware, authorize("driver"), driverController.setAvailability);

export default router;
