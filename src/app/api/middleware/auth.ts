import { AxiosRequestHeaders } from "axios";
import jwt from "jsonwebtoken";

export const auth = (req: AxiosRequestHeaders) => {
  console.log("req", req.headers);
  const authHeader = req.headers.get("authorization");
  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return false; //TODO: improve it in the future
  }

  const token = authHeader.split(" ")[1];

  console.log("token", token);

  try {
    const payload = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
    return true;
  } catch (error) {
    return false;
  }
};
