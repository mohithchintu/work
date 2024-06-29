import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userID: req.body.userID });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: "User not verified" });
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const register = async (req, res) => {
  const { userID, username, password } = req.body;
  try {
    const user = await UserModel.findOne({ userID });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(14);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new UserModel({
      userID,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
