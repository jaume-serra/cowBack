import { Response } from "express";
import { uploadImageS3, deleteImageS3 } from "../services/s3.js";
import { ObjectId } from "mongodb";
import { client } from "../db/index.js";

export const postUpdateImageCow = async (req: any, res: Response) => {
  const location = await uploadImageS3(req.file);
  if (!location) return res.status(401);
  await client
    .db("CowProject")
    .collection("cows")
    .updateOne(
      { _id: new ObjectId(req.file.originalname) },
      { $set: { image_url: location } }
    );
  console.log("completed", req.file.originalname);
  res.status(200).json({ succeded: true, location: location });
};

export const postDeleteImageCow = async (req: any, res: Response) => {
  if (!req.params.imageKey || !req.params.cowId) return;
  await client
    .db("CowProject")
    .collection("cows")
    .updateOne(
      { _id: new ObjectId(req.params.cowId) },
      { $unset: { image_url: "" } }
    );
  await deleteImageS3(req.params.imageKey);
  res.status(200).json({ succeded: true });
};
