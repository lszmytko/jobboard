import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "../../db/connectToDatabase";
import { User } from "../../models/User";
import { AxiosRequestHeaders } from "axios";

const schema = z.object({
  email: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const email = req.nextUrl.searchParams.get("email");
  const validation = schema.safeParse({ email });

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUsers = await User.find({
    email: new RegExp("^" + email, "i"),
  });

  if (!existingUsers.length) {
    return NextResponse.json({ message: "No such users" }, { status: 400 });
  } else
    return NextResponse.json(
      { message: "Users found", users: existingUsers },
      { status: 200 }
    );
}
