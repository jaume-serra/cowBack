import { Response } from "express";
import { uploadImageS3 } from "../services/s3.js";

export const postUpdateImageCow = async (req: any, res: Response) => {
  await uploadImageS3(req.file);
  res.json({ as: "as" });
};
