import { NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Admin } from "../models/Admin";

const schema = z.object({
  name: z.string(),
  password: z.string().min(6, { message: "Password is too short" }),
});

export async function POST(req: Request) {
  await connectToDatabase();

  const { name, password } = await req.json();

  const response = schema.safeParse({ name, password });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }

  const existingAdmin = await Admin.findOne({ name });

  if (!existingAdmin) {
    return NextResponse.json({ error: "There is no admin" }, { status: 403 });
  }
  console.log("przeszło tutaj", existingAdmin);

  console.log("existingAdmin", existingAdmin);

  const isPasswordCorrect = await existingAdmin.comparePasswords(password);

  if (isPasswordCorrect) {
    const token = await existingAdmin.createJWT();
    console.log("token", token);
    return NextResponse.json({
      error: "login successful",
      status: StatusCodes.OK,
      token: token,
      admin: existingAdmin._id,
    });
  } else
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
}
