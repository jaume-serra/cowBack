import { Request, Response } from "express";
import { client } from "../db/index.js";
import xlsx from "xlsx";
import { ObjectID } from "bson";
export const loadDataFromCSV = async (req: any, res: Response) => {
  const ramatId = req.params.ramatId;
  const excelFile = req.file.path;
  // console.log("excelFile :>> ", excelFile);
  // console.log("ramatId :>> ", ramatId);
  const fileData = xlsx.readFile(excelFile, { type: "buffer" });
  const resultData = fileData.SheetNames.map((sheetName: any) => {
    return xlsx.utils.sheet_to_json(fileData.Sheets[sheetName]);
  });
  const correctData = resultData[0].map((cow: any) => {
    return {
      identifier: cow["Identificador"],
      crotal: cow["4 digits"],
      age: cow["Edat, mesos"],
      birthDate: new Date(cow["Data naixement"]),
      birthMO: cow["Explotació naixement"],
      birthCountry: cow["País de naixement"],
      gender: cow["Sexe"] == "Mascle" ? "M" : "F",
      race: cow["Raça"],
      deathDate: cow["Data mort"],
      alert: [],
      ramatId: new ObjectID("639f445393b71a13379e9787"),
    };
  });
  await client.db("CowProject").collection("cows").insertMany(correctData);

  return res.json({ hola: correctData });
};
