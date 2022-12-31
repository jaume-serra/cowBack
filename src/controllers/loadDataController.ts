import { Request, Response } from "express";
import { client } from "../db/index.js";
import xlsx from "xlsx";
import { ObjectID } from "bson";
import { convertStringToDate } from "../utils/convertStringToDate.js";

export const loadDataFromCSV = async (req: any, res: Response) => {
  const ramatId = req.params.ramatId;
  const excelFile = req.file.path;
  const jsonOptions = {
    raw: false,
    dateNF: 'd"/"m"/"yyyy',
  };

  const fileData = xlsx.readFile(excelFile, { type: "buffer" });
  const resultData = fileData.SheetNames.map((sheetName: any) => {
    return xlsx.utils.sheet_to_json(fileData.Sheets[sheetName], jsonOptions);
  });
  const correctData = resultData[0].map((cow: any) => {
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
