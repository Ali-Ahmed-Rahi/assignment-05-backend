"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController = __importStar(require("./ride.controller"));
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Rider routes
router.get("/", auth_1.authMiddleware, (0, auth_1.authorize)("admin"), rideController.getAllRides); //
router.post("/request", auth_1.authMiddleware, rideController.requestRide); //Request a ride with pickup & destination location
router.patch("/:id/cancel", auth_1.authMiddleware, (0, auth_1.authorize)("rider"), rideController.cancelRide); //Cancel a ride (within allowed window)
router.get("/me", auth_1.authMiddleware, (0, auth_1.authorize)("rider"), rideController.getRiderRides); // view ride history
// Driver routes
router.patch("/:id/accept", auth_1.authMiddleware, (0, auth_1.authorize)("driver"), rideController.acceptRide); //Accept ride requests
router.patch("/:id/reject", auth_1.authMiddleware, (0, auth_1.authorize)("driver"), rideController.rejectRide); //reject ride requests
router.patch("/:id/status", auth_1.authMiddleware, (0, auth_1.authorize)("driver"), rideController.updateRideStatus); //Update ride status 
router.get("/me/driver", auth_1.authMiddleware, (0, auth_1.authorize)("driver"), rideController.getDriverRides); //Set availability status 
router.patch("/:id/complete", auth_1.authMiddleware, (0, auth_1.authorize)("driver"), rideController.completeRideController); //View earnings history
exports.default = router;
