import express from "express";
const ramatRoutes = express.Router();
import { getData, getRamatsFromUser } from "../controllers/ramatController.js";

ramatRoutes.get("/:userId", getRamatsFromUser);
ramatRoutes.get("/", getData);

export default ramatRoutes;
