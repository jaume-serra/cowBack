import express from "express";
import {
  postUpdateImageCow,
  postDeleteImageCow,
  postAddCow
} from "../controllers/cowController.js";
import { uploadFile } from "../middleware/uploadFile.cjs";
import { verifyRequest } from "../middleware/verifyRequest.js";

const cowRoutes = express.Router();
cowRoutes.post("/add", verifyRequest, postAddCow);
cowRoutes.post("/uploadImage", uploadFile.single("image"), postUpdateImageCow);
cowRoutes.get("/deleteImage/:cowId/:imageKey", postDeleteImageCow);

export default cowRoutes;
