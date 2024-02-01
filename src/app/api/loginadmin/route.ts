import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { createJWT } from "../utils";

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

  const isPasswordCorrect = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD as string
  );

  if (isPasswordCorrect) {
    const token = await createJWT();
    return NextResponse.json({
      error: "login successful",
      status: StatusCodes.OK,
      token: token,
    });
  } else
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
}
