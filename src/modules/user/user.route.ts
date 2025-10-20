import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

router.get("/:id", authMiddleware, authorize("admin"), userController.getUserById);

router.patch("/:id", authMiddleware, authorize("admin"), userController.updateUser);

router.patch("/:id/block", authMiddleware, authorize("admin"), userController.blockUser);

router.patch("/:id/unblock", authMiddleware, authorize("admin"), userController.unblockUser);

export default router;
