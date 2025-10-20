import { Router } from "express";
import * as adminController from "./admin.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware, authorize("admin"));

router.get("/riders", adminController.getUsers);

router.get("/drivers", adminController.getDrivers);

router.patch("/drivers/:id/approve", adminController.approveSuspendDriver);

router.get("/rides", adminController.getRides);

export default router;
