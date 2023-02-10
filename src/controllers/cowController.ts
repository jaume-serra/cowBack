import { Response } from "express";
import { uploadImageS3, deleteImageS3 } from "../services/s3.js";
import { ObjectId } from "mongodb";
import { client } from "../db/index.js";
import { convertDateToMonth } from "../utils/convertDates.js";

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


export const postAddCow = async (req: any, res: Response) => {
  const {identifier, motherCrotal, gender, breed, birthDate, ramatId} = req.body
  // Check if mother exists
  const date = new Date(birthDate)
  let motherCow
  if(motherCrotal) {
    motherCow = await client
      .db("CowProject")
      .collection("cows")
      .findOne({ ramatId: new ObjectId(ramatId?.toString()), crotal: motherCrotal })
  }

  //Check if animal already exists
  const exists = await client
    .db("CowProject")
    .collection("cows")
    .findOne({ ramatId: new ObjectId(ramatId?.toString()), identifier: identifier  })

  if(exists){
    return res.status(400).json({error: "L'identificador de l'animal ja existeix"})
  }

  const newAnimal = {
    identifier: identifier,
    crotal: identifier.slice(-4),
    birthDate: date,
    gender: gender == "Mascle" ? "M" : "F",
    race: breed,
    ramatId: new ObjectId(ramatId),
    type:
      convertDateToMonth(date) < 14
        ? "calf"
        : gender == "Mascle"
        ? "bull"
        : "cow",
    motherIdentifier: motherCow?.identifier,
  };
  // Create new animal
  const createdAnimal = 
    await client
    .db("CowProject")
    .collection("cows")
    .insertOne(newAnimal)

  // Add animal to mother and update nextBirthDate
  if(motherCow){
    await client 
      .db("CowProject")
      .collection("cows")
      .updateOne(
        { _id: new ObjectId(motherCow._id) },
        { 
          $push: { sons: createdAnimal.insertedId }, 
          $set: { nextBirthDate: new Date(date.getTime() + 31536000000)} 
        }
      );
  }
  await createLogs(createdAnimal.insertedId, newAnimal.ramatId ,newAnimal.birthDate, motherCow?._id,)
  res.status(200).json({ succeded: true })

}

export const postDeleteCow = async (req: any, res: Response) => {
  const {checkedCows, deleteReason, deleteDate, ramatId} = req.body
  const cowsData = checkedCows.map((cow: {id:string, crotal:string}) => {
    return {cow_id : new ObjectId(cow.id), deleteReason, deathDate: new Date(deleteDate)}
  })

  const cowsIds = checkedCows.map((cow: {id:string, crotal:string}) => {
    return new ObjectId(cow.id)
  })

  await client 
  .db("CowProject")
  .collection("history_dead")
  .insertMany(cowsData);


  await client 
  .db("CowProject")
  .collection("cows")
  .updateMany(
    { _id: {$in: cowsIds} },
    { $set: {death: true}},
    )
  
  return res.status(200).json({ succeded: true })

}

const createLogs = async (animalId: ObjectId, ramatId: ObjectId, birthDate: Date,  motherId?: ObjectId ) => {
  //TODO:Revisar les dades que s'inserten
  await client
    .db("CowProject")
    .collection("history_born")
    .insertOne({
      animalId,
      ramatId,
      date: birthDate,
      "motherId": motherId ? motherId : null
    })
  console.log('animalId, motherId, ramatId, birtDate', animalId, motherId, ramatId, birthDate)
}