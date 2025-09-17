import { Router } from "express";
import * as rideController from "./ride.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Rider routes
router.get("/",authMiddleware, authorize("admin"),rideController.getAllRides)//
router.post("/request", authMiddleware, rideController.requestRide);//Request a ride with pickup & destination location
router.patch("/:id/cancel", authMiddleware, authorize("rider"), rideController.cancelRide);//Cancel a ride (within allowed window)
router.get("/me", authMiddleware, authorize("rider"), rideController.getRiderRides);// view ride history

// Driver routes
router.patch("/:id/accept", authMiddleware, authorize("driver"), rideController.acceptRide);//Accept ride requests
router.patch("/:id/reject",authMiddleware,authorize("driver"),rideController.rejectRide);//reject ride requests
router.patch("/:id/status", authMiddleware, authorize("driver"), rideController.updateRideStatus);//Update ride status 
router.get("/me/driver", authMiddleware, authorize("driver"), rideController.getDriverRides);//Set availability status 

export default router;
