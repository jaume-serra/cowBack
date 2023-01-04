import { Response } from "express";
import { uploadImageS3 } from "../services/s3.js";

export const postUpdateImageCow = async (req: any, res: Response) => {
  const hola = { as: "as" };
  console.log("req.body :>> ", req.body);
  const { cowId, image } = req.body;

  await uploadImageS3(cowId, image);

  res.json(hola);
};
