import express from "express";
const ramatRoutes = express.Router();
import { getData } from "../controllers/ramatController.js";

ramatRoutes.get("/", getData);

export default ramatRoutes;
