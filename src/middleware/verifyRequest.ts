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
  console.log("token :>> ", token);
  try {
    const client = await clients.verifyClient(token);
    console.log("client :>> ", client);
    if (!client.lastActiveSessionId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const session = await sessions.verifySession(
      //@ts-ignore
      client.lastActiveSessionId,
      token
    );
    console.log("session :>> ", session);
    const user = await users.getUser(session.userId);
    console.log("user :>> ", user);
    req.user = user;
    next();
  } catch (err) {
    console.log("err :>> ", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
