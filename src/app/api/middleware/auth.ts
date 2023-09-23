import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const auth = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return false; //TODO: improve it in the future
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch (error) {
    return false;
  }
};
