import { Router } from "express";
import * as adminController from "./admin.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware, authorize("admin"));

// admin can see all riders/users 
router.get("/users", adminController.getUsers);

// admin can update riders/users
router.patch("/users/:id/block", adminController.blockUnblockUser);


// admin can see all drivers
router.get("/drivers", adminController.getDrivers);

// admin can update drivers 
router.patch("/drivers/:id/approve", adminController.approveSuspendDriver);

// admin can see all rides
router.get("/rides", adminController.getRides);

export default router;
