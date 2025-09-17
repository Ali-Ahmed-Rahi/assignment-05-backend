import mongoose, { Model, Schema} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser  {
  name: string;
  email: string;
  password: string;
  role: "rider" | "driver" | "admin";
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<IUser>{
  comparePassword(plainPassword:string,hashedPassword:string): Promise<boolean>
}

const userSchema  = new Schema<IUser,UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["rider", "driver", "admin"], required: true },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

// Compare password method
userSchema.statics.comparePassword = async function (plainPassword: string,hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User =  mongoose.model<IUser,UserModel>("User", userSchema);







// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password:string;
//   role: "rider" | "driver" | "admin";
//   blocked: boolean;
//   comparePassword: (password: string) => Promise<boolean>; // method
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema: Schema<IUser> = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["rider", "driver", "admin"], required: true },
//     blocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
