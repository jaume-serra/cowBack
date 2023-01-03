import express from "express";
import { postUpdateImageCow } from "../controllers/cowController.js";
import { verifyRequest } from "../middleware/verifyRequest.js";

const cowRoutes = express.Router();

cowRoutes.post("/uploadImage", postUpdateImageCow);

export default cowRoutes;
