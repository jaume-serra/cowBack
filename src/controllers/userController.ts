import { Request, Response } from "express";
import { client } from "../db/index.js";

const getUserIdByEmail = async (email: string) => {
  const userId = await client
    .db("CowProject")
    .collection("users")
    .findOne({ email });
  return await userId?._id;
};

export const getUserId = async (req: any, res: Response) => {
  const user = req.user;
  const email = user.emailAddresses[0].emailAddress;
  const userId = await getUserIdByEmail(email);
  return await res.json({ user, email, userId });
};
