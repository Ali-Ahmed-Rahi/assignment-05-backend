import { Router } from "express";
import * as rideController from "./ride.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Rider routes
router.post("/request", authMiddleware, rideController.requestRide);
router.patch("/:id/cancel", authMiddleware, authorize("rider"), rideController.cancelRide);
router.get("/me", authMiddleware, authorize("rider"), rideController.getRiderRides);
router.get("/me/driver", authMiddleware, authorize("driver"), rideController.getDriverRides);


// Driver routes
router.patch("/:id/accept", authMiddleware, authorize("driver"), rideController.acceptRide);
router.patch("/:id/reject",authMiddleware,authorize("driver"),rideController.rejectRide);
router.patch("/:id/status", authMiddleware, authorize("driver","admin"), rideController.updateRideStatus);
router.patch("/:id/complete", authMiddleware, authorize("driver"), rideController.completeRide);



export default router;
