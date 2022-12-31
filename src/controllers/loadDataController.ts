import { Request, Response } from "express";
import { client } from "../db/index.js";
import { ObjectID } from "bson";
import { convertStringToDate } from "../utils/convertStringToDate.js";
import { convertXlsxToJson } from "../utils/convertXlsxToJson.js";

export const loadDataFromCSV = async (req: any, res: Response) => {
  const ramatId = req.params.ramatId;
  const excelFilePath = req.file.path;
  const jsonData = convertXlsxToJson(excelFilePath);
  const correctData = jsonData.map((cow: any) => {
    return {
      identifier: cow["Identificador"],
      crotal: cow["4 digits"],
      age: cow["Edat, mesos"],
      birthDate: convertStringToDate(cow["Data naixement"]),
      birthMO: cow["Explotació naixement"],
      birthCountry: cow["País de naixement"],
      gender: cow["Sexe"] == "Mascle" ? "M" : "F",
      race: cow["Raça"],
      deathDate:
        cow["Data mort"] == " "
          ? undefined
          : convertStringToDate(cow["Data mort"]),
      alert: [],
      ramatId: new ObjectID("639f445393b71a13379e9787"),
    };
  });
  await client.db("CowProject").collection("cows").insertMany(correctData);

  return res.json({ hola: correctData });
};
