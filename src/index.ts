import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/main.js";

dotenv.config({ path: "./src/config/.env" });

const app: Express = express();
const port = process.env.PORT;

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
