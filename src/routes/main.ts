import express from "express";
const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => {
  res.json({ "hello": "laia" });
});

export default mainRoutes;
