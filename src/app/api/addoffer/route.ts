import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { User } from "../models/User";
import { auth } from "../middleware/auth";
import { AxiosRequestHeaders } from "axios";
import { ObjectId } from "mongodb";

const schema = z.object({
  post: z.string(),
  user: z.instanceof(ObjectId),
});

export async function POST(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const { post, user, headers } = await req.json();

  const response = schema.safeParse({ post, user });

  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 403 }
    );
  }

  const existingUser = await User.findOne({ _id: user });

  if (!existingUser) {
    return NextResponse.json({ message: "No such user" }, { status: 400 });
  }

  const isAuthorized = auth(req);

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized" },
      { status: 403 }
    );
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
