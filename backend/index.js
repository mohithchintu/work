import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authroute from "./routes/authroute.js";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => console.log("PORT Running"));

app.use("/api/auth", authroute);
