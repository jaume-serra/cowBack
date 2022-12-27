import express from "express";
const userRoutes = express.Router();
import { getUserIdByEmail, getUserId } from "../controllers/userController.js";
import { verifyRequest } from "../middleware/verifyRequest.js";

userRoutes.get("/auth", verifyRequest, getUserId);
userRoutes.get("/:email", getUserIdByEmail);

export default userRoutes;
