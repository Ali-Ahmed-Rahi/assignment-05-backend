import { User } from "./user.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";



export const getUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid user ID");
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const updateUser = async (id: string, data: Partial<any>) => {
  const user = await getUserById(id);
  Object.assign(user, data);
  await user.save();
  return user;
};

export const blockUser = async (id: string) => {
  const user = await getUserById(id);
  user.blocked = true;
  await user.save();
  return user;
};

export const unblockUser = async (id: string) => {
  const user = await getUserById(id);
  user.blocked = false;
  await user.save();
  return user;
};
