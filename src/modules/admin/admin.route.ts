import { Router } from "express";
import * as adminController from "./admin.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware, authorize("admin"));

// Users
router.get("/users", adminController.getUsers);
router.patch("/users/:id/block", adminController.blockUnblockUser);

// Drivers
router.get("/drivers", adminController.getDrivers);
router.patch("/drivers/:id/approve", adminController.approveSuspendDriver);

// Rides
router.get("/rides", adminController.getRides);

export default router;
