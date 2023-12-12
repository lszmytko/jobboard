import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "../../db/connectToDatabase";
import { User } from "../../models/User";
import { AxiosRequestHeaders } from "axios";

const schema = z.object({
  userID: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const userID = req.nextUrl.searchParams.get("userID");

  console.log("*** userID", userID);

  const validation = schema.safeParse({ userID });

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({
    _id: userID,
  });

  if (!existingUser) {
    return NextResponse.json({ message: "No such user" }, { status: 400 });
  } else
    return NextResponse.json(
      {
        message: "User found",
        user: existingUser,
      },
      { status: 200 }
    );
}
