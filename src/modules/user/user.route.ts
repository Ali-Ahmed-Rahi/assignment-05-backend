import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();

// Only Admin can manage users
router.get("/", authMiddleware, authorize("admin"), userController.getAllUsers);
router.get("/:id", authMiddleware, authorize("admin"), userController.getUserById);
router.patch("/:id", authMiddleware, authorize("admin"), userController.updateUser);
router.patch("/block/:id", authMiddleware, authorize("admin"), userController.blockUser);
router.patch("/unblock/:id", authMiddleware, authorize("admin"), userController.unblockUser);

export default router;
