import express from "express";
import { postUpdateImageCow } from "../controllers/cowController.js";
import { uploadFile } from "../middleware/uploadFile.cjs";
import { verifyRequest } from "../middleware/verifyRequest.js";

const cowRoutes = express.Router();

cowRoutes.post("/uploadImage", uploadFile.single("image"), postUpdateImageCow);

export default cowRoutes;
