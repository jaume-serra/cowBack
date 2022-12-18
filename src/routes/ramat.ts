import express from "express";
const ramatRoutes = express.Router();
import {
  getCowsFromRamat,
  getRamatsFromUser,
} from "../controllers/ramatController.js";

ramatRoutes.get("/:userId", getRamatsFromUser);
ramatRoutes.get("/cows/:ramatId", getCowsFromRamat);

export default ramatRoutes;
