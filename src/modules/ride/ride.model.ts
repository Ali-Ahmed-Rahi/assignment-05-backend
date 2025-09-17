import mongoose, { Schema, Document } from "mongoose";

export interface IRide extends Document {
  rider: mongoose.Schema.Types.ObjectId;
  driver?: mongoose.Schema.Types.ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  fare?: number;
  status: "requested" | "accepted" | "in-progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const rideSchema: Schema<IRide> = new Schema(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Driver" },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    fare: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["requested", "accepted", "in-progress", "completed", "cancelled"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export const Ride = mongoose.models.Ride || mongoose.model<IRide>("Ride", rideSchema);
