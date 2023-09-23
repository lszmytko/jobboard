import { NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/User";
import connectToDatabase from "../db/connectToDatabase";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password } = await req.json();

  const response = schema.safeParse({ email, password });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return NextResponse.json({ error: "No such user" }, { status: 403 });
  }

  const isPasswordCorrect = await existingUser.comparePasswords(password);

  if (isPasswordCorrect) {
    const token = await existingUser.createJWT();
    return NextResponse.json({
      error: "you are logged in",
      status: StatusCodes.OK,
      token: token,
    });
  } else return NextResponse.json({ error: "Invalid password", status: 403 });
}
