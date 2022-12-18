import {  Request, Response } from "express";

export const getData = (req: Request, res: Response) => {
  const date = new Date("2022/09/13");
  const parsedData = `${date.getFullYear().toString()}/${(
    date.getMonth() + 1
  ).toString()}/${date.getDate().toString()}`;
  return res.json([
    {
      id: "1",
      data: [
        ["0061", "M", "", "baby", "image_url.png"],
        ["3319", "F", "", "pregnant", "image_url.png"],
        ["0001", "M", "", "", "image_url.png"],
        ["0061", "M", "", "", "image_url.png"],
        ["0061", "M", "", "", "image_url.png"],
        ["0092", "F", parsedData, "", "image_url.png"],
        ["1274", "F", parsedData, "alert", "image_url.png"],
        ["6547", "F", parsedData, "alert", "image_url.png"],
        ["6547", "M", "", "baby", "image_url.png"],
        ["6547", "F", parsedData, "pregnant", "image_url.png"],
        ["6547", "F", parsedData, "pregnant", "image_url.png"],
        ["0002", "F", parsedData, "", "image_url.png"],
      ],
    },
    {
      id: "2",
      data: [
        ["6547", "F", parsedData, "pregnant", "image_url.png"],
        ["6547", "F", parsedData, "pregnant", "image_url.png"],
        ["6547", "F", parsedData, "", "image_url.png"],
      ],
    },
  ]);
};
