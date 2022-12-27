import { Response, NextFunction } from "express";
import { sessions, clients, users } from "@clerk/clerk-sdk-node";

export const verifyRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.token;
  if (!token) res.sendStatus(401);
  try {
    const client = await clients.verifyClient(token);
    const session = await sessions.verifySession(
      //@ts-ignore
      client.lastActiveSessionId,
      token
    );
    const user = await users.getUser(session.userId);
    req.user = user;
    next();
  } catch {
    res.sendStatus(401);
  }
};
