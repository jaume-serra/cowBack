import express from "express";
import { verifyRequest } from "../middleware/verifyRequest.js";
import { loadDataFromCSV } from "../controllers/loadDataController.js";
import { uploadFile } from "../middleware/uploadFile.cjs";
const loadData = express.Router();

loadData.post("/:ramatId", uploadFile.single("excelFile"), loadDataFromCSV);

export default loadData;
