import { Response, NextFunction } from "express";
import { sessions, clients, users } from "@clerk/clerk-sdk-node";

export const verifyRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.token;
  if (token == null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const client = await clients.verifyClient(token);
    if (!client.lastActiveSessionId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const session = await sessions.verifySession(
      //@ts-ignore
      client.lastActiveSessionId,
      token
    );
    const user = await users.getUser(session.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
