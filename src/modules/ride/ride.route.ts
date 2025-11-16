import { Router } from "express";
import * as rideController from "./ride.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Rider routes
router.post("/rides/request", authMiddleware, rideController.requestRide);
router.patch("/rides/:id/cancel", authMiddleware, authorize("rider"), rideController.cancelRide);
router.get("/rides/me", authMiddleware, authorize("rider"), rideController.getRiderRides);
router.get("/rides/me/driver", authMiddleware, authorize("driver"), rideController.getDriverRides);


// Driver routes
router.patch("/rides/:id/accept", authMiddleware, authorize("driver"), rideController.acceptRide);
router.patch("/rides/:id/reject",authMiddleware,authorize("driver"),rideController.rejectRide);
router.patch("/rides/:id/status", authMiddleware, authorize("driver"), rideController.updateRideStatus);
router.patch("/rides/:id/complete", authMiddleware, authorize("driver"), rideController.completeRide);



export default router;
