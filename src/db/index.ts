import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const mongoUri = process.env.MONGO_URI || "";

let dbConnection: any;
let CowProject: any;

export const client = new MongoClient(mongoUri, {
  serverApi: ServerApiVersion.v1,
  //@ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async function () {
  if (!dbConnection) {
    try {
      dbConnection = await client.connect();
      CowProject = client.db("CowProject");
      console.log(`Connection ESTABLISHED to DB`);
    } catch (err) {
      console.error(`Error connectiong to DB`, err);
      throw err;
    }
  } else {
    console.log("%cAlready connected", "color:yellow");
  }
  return dbConnection;
};

const getDb = async () => {
  return await connect();
};

export default getDb;
