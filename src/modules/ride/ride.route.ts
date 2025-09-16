import { Router } from "express";
import * as rideController from "./ride.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Rider routes
router.post("/request", authMiddleware, authorize("rider"), rideController.requestRide);
router.patch("/:id/cancel", authMiddleware, authorize("rider"), rideController.cancelRide);
router.get("/me", authMiddleware, authorize("rider"), rideController.getRiderRides);

// Driver routes
router.patch("/:id/accept", authMiddleware, authorize("driver"), rideController.acceptRide);
router.patch("/:id/status", authMiddleware, authorize("driver"), rideController.updateRideStatus);
router.get("/me/driver", authMiddleware, authorize("driver"), rideController.getDriverRides);

export default router;
