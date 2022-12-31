import { Request, Response } from "express";
import { client } from "../db/index.js";
import xlsx from "xlsx";
import { ObjectID } from "bson";
export const loadDataFromCSV = async (req: any, res: Response) => {
  const ramatId = req.params.ramatId;
  const excelFile = req.file.path;
  console.log("excelFile :>> ", excelFile);
  console.log("ramatId :>> ", ramatId);

  const fileData = xlsx.readFile(excelFile, { type: "buffer" });
  let resultData: any = [];
  fileData.SheetNames.forEach((sheetName: any) => {
    let rowObject = xlsx.utils.sheet_to_json(fileData.Sheets[sheetName]);
    resultData.push(rowObject);
  });
  let correctData: any = [];
  resultData[0].map((cow: any, index: number) => {
    //TODO: Canviar aixo
    correctData.push({
      identifier: cow["Identificador"],
      crotal: cow["4 digits"],
      age: cow["Edat, mesos"],
      birthDate: cow["Data naixement"],
      birthMO: cow["Explotació naixement"],
      birthCountry: cow["País de naixement"],
      gender: cow["Sexe"],
      race: cow["Raça"],
      deathDate: cow["Data mort"],
      alert: [],
      ramatId: new ObjectID("639f445393b71a13379e9787"),
    });
  });
  await client.db("CowProject").collection("cows").insertMany(correctData);

  return res.json({ hola: resultData });
};
