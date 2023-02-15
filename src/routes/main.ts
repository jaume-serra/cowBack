import express from "express";
const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => {
  res.json({ "hello": "laia" });
});

mainRoutes.get("/status", (req, res) => {
  res.status(200).json({ "hello": "laia" });
});

export default mainRoutes;
