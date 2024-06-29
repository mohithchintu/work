import UserModel from "../models/UserModel";
import bcryptjs from "bcryptjs";

const SALT = 14;

export const createUser = async (userData) => {
  try {
    const hashedPassword = await bcryptjs.hash(userData.password, SALT);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export const getUsers = async () => {
  try {
    const users = await UserModel.find({}).exec();
    return users;
  } catch (err) {
    console.error("Error finding users:", err);
    throw err;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId).exec();
    return user;
  } catch (err) {
    console.error("Error finding user:", err);
    throw err;
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcryptjs.hash(updateData.password, SALT);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).exec();
    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId).exec();
    return deletedUser;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};
