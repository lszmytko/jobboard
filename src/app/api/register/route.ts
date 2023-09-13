import { NextResponse } from "next/server";
import { z } from "zod";

import { User } from "../models/User";
import connectToDatabase from "../db/connectToDatabase";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();

  const response = schema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  const { email, password } = response.data;

  const isUserExisting = await User.findOne({ email });

  console.log(isUserExisting);

  if (isUserExisting) {
    return NextResponse.json({
      error: { message: "User already exists" },
      status: 403,
    });
  }

  const user = await User.create({ email, password });

  const token = await user.createJWT();

  return NextResponse.json({ msg: "User created", status: 200, token });
}
