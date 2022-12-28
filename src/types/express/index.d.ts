import { UserResource } from "@clerk/types";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserResource;
    }
  }
}
