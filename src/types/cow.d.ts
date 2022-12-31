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
  calf?: Array<{ calfId?: objectId; birth?: string; weaned?: boolean }>;
  type: "cow" | "calf" | "bull" | "calf_weaned" | "replacement_beef" | string;
}
