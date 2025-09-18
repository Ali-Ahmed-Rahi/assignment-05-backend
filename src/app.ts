import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import driverRoutes from "./modules/driver/driver.route";
import rideRoutes from "./modules/ride/ride.route";
import adminRoutes from "./modules/admin/admin.route";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Ride Booking API is running...");
});


// Middlewares
app.use(cors());
app.use(express.json());

// Api Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/admin", adminRoutes);



// Error handler
app.use(errorHandler);

export default app;
