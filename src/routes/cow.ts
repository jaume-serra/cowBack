import express from "express";
import {
  postUpdateImageCow,
  postDeleteImageCow,
} from "../controllers/cowController.js";
import { uploadFile } from "../middleware/uploadFile.cjs";
import { verifyRequest } from "../middleware/verifyRequest.js";

const cowRoutes = express.Router();

cowRoutes.post("/uploadImage", uploadFile.single("image"), postUpdateImageCow);
cowRoutes.get("/deleteImage/:cowId/:imageKey", postDeleteImageCow);

export default cowRoutes;
