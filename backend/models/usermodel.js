import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "UserID is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    fineIDS: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
