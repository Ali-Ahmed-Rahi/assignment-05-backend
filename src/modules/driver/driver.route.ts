import express from "express";
import * as driverController from "./driver.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = express.Router();


router.patch("/:id/approve", authMiddleware, authorize("admin"), driverController.approveDriver);

router.patch("/:id/suspend", authMiddleware, authorize("admin"), driverController.suspendDriver);

router.get("/", authMiddleware, authorize("admin"), driverController.getAllDrivers);

router.get("/:id", authMiddleware, authorize("admin"), driverController.getDriverById);

router.patch("/availability", authMiddleware, authorize("driver"), driverController.setAvailability);

router.get("/earnings", authMiddleware, authorize("driver"), driverController.getEarnings);

export default router;
