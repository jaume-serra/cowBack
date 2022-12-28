import express from "express";
import { verifyRequest } from "../middleware/verifyRequest.js";

const ramatRoutes = express.Router();
import {
  getCowsFromRamat,
  getRamatsFromUser,
} from "../controllers/ramatController.js";

ramatRoutes.get("/:userId", verifyRequest, getRamatsFromUser);
ramatRoutes.get("/cows/:ramatId", verifyRequest, getCowsFromRamat);

export default ramatRoutes;
