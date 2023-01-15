import express from "express";
const userRoutes = express.Router();
import { getUserId,postCreateUser } from "../controllers/userController.js";
import { verifyRequest } from "../middleware/verifyRequest.js";

userRoutes.post("/createUser", postCreateUser);
userRoutes.get("/auth", verifyRequest, getUserId);

export default userRoutes;
