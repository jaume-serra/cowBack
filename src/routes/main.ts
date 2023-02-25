import express from "express";
import { verifyRequest } from "../middleware/verifyRequest.js";
const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => {
  res.json({ hello: "laia" });
});

mainRoutes.get("/status", verifyRequest, (req, res) => {
  res.status(200).json({ hello: "laia" });
});

export default mainRoutes;
