import express from "express";
import { verifyRequest } from "../middleware/verifyRequest.js";
import { loadDataFromCSV } from "../controllers/loadDataController.js";
import { uploadFile } from "../middleware/uploadFile.cjs";
const loadDataRoutes = express.Router();

loadDataRoutes.post(
  "/:ramatId",
  uploadFile.single("excelFile"),
  loadDataFromCSV
);

export default loadDataRoutes;
