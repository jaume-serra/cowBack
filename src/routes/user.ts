import express from "express";
const userRoutes = express.Router();
import { getUserId } from "../controllers/userController.js";
import { verifyRequest } from "../middleware/verifyRequest.js";

userRoutes.get("/auth", verifyRequest, getUserId);

export default userRoutes;
