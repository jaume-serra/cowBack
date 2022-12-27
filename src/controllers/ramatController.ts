import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { client } from "../db/index.js";

export const getCowsFromRamat = async (req: Request, res: Response) => {
  const ramatId = req.params.ramatId;

  const cows = await client
    .db("CowProject")
    .collection("cows")
    .find({ ramatId: new ObjectId(ramatId?.toString()) })
    .toArray();
  res.json(cows);
};

export const getRamatsFromUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await client
    .db("CowProject")
    .collection("users")
    .findOne({ _id: new ObjectId(userId?.toString()) });
  if (!user) return;

  const ramats = await Promise.all(
    user.ramatId?.map(async (ramatId: ObjectId) => {
      return client
        .db("CowProject")
        .collection("ramats")
        .findOne({ _id: new ObjectId(ramatId?.toString()) });
    })
  );
  res.json(ramats);
};
