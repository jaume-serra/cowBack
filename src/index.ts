import express, { Express } from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/main.js";
import ramatRoutes from "./routes/ramat.js";
import getDb from "./db/index.js";
import userRoutes from "./routes/user.js";
import loadDataRoutes from "./routes/loadData.js";
import bodyParser from "body-parser";
import cowRoutes from "./routes/cow.js";

dotenv.config({ path: "./src/config/.env" });

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", mainRoutes);
app.use("/ramat", ramatRoutes);
app.use("/user", userRoutes);
app.use("/load", loadDataRoutes);
app.use("/cow", cowRoutes);

getDb().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
