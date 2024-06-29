import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

const SALT = 14;

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const hashedPassword = await bcryptjs.hash(userData.password, SALT);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).exec();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error finding users:", err);
    return res.status(500).json({ error: "Error finding users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOne({ userID: userId }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ error: "Error finding user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcryptjs.hash(updateData.password, SALT);
    }
    const { _id } = await UserModel.findOne({ userID: userId }).exec();
    const updatedUser = await UserModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    }).exec();
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id } = await UserModel.findOne({ userID: userId }).exec();
    const deletedUser = await UserModel.findByIdAndDelete(_id).exec();
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Error deleting user" });
  }
};
