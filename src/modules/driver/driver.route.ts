import express from "express";
import * as driverController from "./driver.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = express.Router();


router.patch("/:id/approve", authMiddleware, authorize("admin"), driverController.approveDriver);//

router.patch("/:id/suspend", authMiddleware, authorize("admin"), driverController.suspendDriver);//

router.get("/", authMiddleware, authorize("admin"), driverController.getAllDrivers);//

router.get("/:id", authMiddleware, authorize("admin"), driverController.getDriverById);//

router.patch("/availability", authMiddleware, authorize("driver"), driverController.setAvailability);

router.get("/earnings/me", authMiddleware, authorize("driver"), driverController.getEarnings);


// Driver routes
router.get("/info/me", authMiddleware, authorize("driver"), driverController.getDriverRides);
router.patch("/:id/accept", authMiddleware, authorize("driver"), driverController.acceptRide);
router.patch("/:id/reject",authMiddleware,authorize("driver"),driverController.rejectRide);
router.patch("/:id/status", authMiddleware, authorize("driver"), driverController.updateRideStatus);
router.patch("/:id/complete", authMiddleware, authorize("driver"), driverController.completeRide);

export default router;
