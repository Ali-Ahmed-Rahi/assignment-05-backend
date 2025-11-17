import { Router } from "express";
import * as rideController from "./ride.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Rider routes
router.post("/rides/request", authMiddleware, rideController.requestRide);//
router.patch("/rides/:id/cancel", authMiddleware, authorize("rider"), rideController.cancelRide);//
router.get("/rides/me", authMiddleware, authorize("rider"), rideController.getRiderRides);//






export default router;
