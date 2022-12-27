import { Request, Response } from "express";
import { client } from "../db/index.js";
import { sessions, clients, users } from "@clerk/clerk-sdk-node";

export const getUserIdByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;

  const userId = await client
    .db("CowProject")
    .collection("users")
    .findOne({ email });
  console.log("userId :>> ", userId);
  return await res.json(userId?._id);
};

export const getUserId = async (req: any, res: Response) => {
  console.log("req.user :>> ", req.user);
  return await res.json({ a: "hola" });
};
