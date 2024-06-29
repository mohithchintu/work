import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
