import { User } from "./auth.model";
import ApiError from "../../utils/ApiError";
import jwt from "jsonwebtoken";
import { IUser } from "./auth.model";

export const registerUser = async (data: Partial<IUser>) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already exists");

  const user = new User(data);
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");
  if (user.blocked) throw new ApiError(403, "User is blocked");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  return { user, token };
};
