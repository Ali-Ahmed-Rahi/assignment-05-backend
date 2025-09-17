import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware, authorize } from "../../middlewares/auth";

const router = Router();


// get all (riders/user)
router.get("/", authMiddleware, authorize("admin"), userController.getAllUsers);

// get a riders by id (riders/user)
router.get("/:id", authMiddleware, authorize("admin"), userController.getUserById);



// only admin can do this 

// update user only ( admin )
router.patch("/:id", authMiddleware, authorize("admin"), userController.updateUser);

// this route for block rider ( admin )
router.patch("/:id/block", authMiddleware, authorize("admin"), userController.blockUser);

// this route for unblock rider ( admin )
router.patch("/:id/unblock", authMiddleware, authorize("admin"), userController.unblockUser);

export default router;
