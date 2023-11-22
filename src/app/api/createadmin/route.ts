import { NextResponse } from "next/server";
import { z } from "zod";

import { Admin } from "../models/Admin";
import connectToDatabase from "../db/connectToDatabase";

const schema = z.object({
  name: z.string(),
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

  const isUserExisting = await Admin.find();

  if (isUserExisting.length > 0) {
    return NextResponse.json(
      {
        error: { message: "User already exists" },
      },
      { status: 405 }
    );
  }

  const { name, password } = response.data;

  const admin = await Admin.create({
    name,
    password,
  });

  return NextResponse.json({ msg: "User created", admin }, { status: 200 });
}
