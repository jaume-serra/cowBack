import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/main.js";
import ramatRoutes from "./routes/ramat.js";
import getDb from "./db/index.js";

dotenv.config({ path: "./src/config/.env" });

const app: Express = express();
const port = process.env.PORT;

app.use("/", mainRoutes);
app.use("/ramat", ramatRoutes);

getDb().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
