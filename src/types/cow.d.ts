export interface ICow {
  _id?: objectId;
  identifier: string;
  crotal: string;
  age: number;
  gender: string | "F" | "M";
  alert?: Array<string>;
  image_url?: string;
  ramatId?: objectId;
  birthDate?: Date;
  deathDate?: Date;
  birthMO?: string;
  birthCountry?: string;
  race?: string;
  sons?: Array<ICow>;
  type: "cow" | "calf" | "bull" | "calf_weaned" | "replacement_beef" | string;
  motherIdentifier: string;
  nextBirthDate: Date;
}
