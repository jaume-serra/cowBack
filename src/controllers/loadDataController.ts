import { Request, Response } from "express";
import { client } from "../db/index.js";
import { ObjectID } from "bson";
import { convertStringToDate } from "../utils/convertStringToDate.js";
import { convertXlsxToJson } from "../utils/convertXlsxToJson.js";
import { ICow } from "../types/cow.js";

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
      sons: [],
      ramatId: new ObjectID(ramatId),
      type:
        parseInt(cow["Edat, mesos"]) < 14
          ? "calf"
          : cow["Sexe"] == "Mascle"
          ? "bull"
          : "cow",
      motherIdentifier: cow["Identificador mare"],
    };
  });
  await client.db("CowProject").collection("cows").insertMany(correctData);
  await updateCowSonsFromImport(ramatId);
  return res.json({ hola: correctData });
};

const updateCowSonsFromImport = async (ramatId: string) => {
  await client
    .db("CowProject")
    .collection("cows")
    .find({ ramatId: ramatId })
    .forEach(function (doc) {
      if (
        doc.motherIdentifier &&
        //@ts-ignore
        client
          .db("CowProject")
          .collection("cows")
          .findOne({ identifier: doc.motherIdentifier, ramatId: ramatId })
      ) {
        client
          .db("CowProject")
          .collection("cows")
          .findOne({ identifier: doc.motherIdentifier })
          .then((mother: any) => {
            if (
              !mother?.sons ||
              !mother?.sons.find(function (son: any) {
                return son.identifier == doc.identifier;
              })
            ) {
              client
                .db("CowProject")
                .collection("cows")
                .updateOne(
                  { identifier: doc.motherIdentifier },
                  { $push: { sons: doc } }
                );
            }
          });
      }
    });
};
