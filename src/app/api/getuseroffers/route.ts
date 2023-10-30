import { NextResponse } from "next/server";
import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/User";
import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { auth } from "../middleware/auth";

const schema = z.object({
  user: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const userID = req.nextUrl.searchParams.get("user");

  const response = schema.safeParse({ user: userID });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  const isAuthorized = auth(req);

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "You are not authorized" },
      { status: 403 }
    );
  }

  const existingUser = await User.findOne({ _id: userID });

  if (!existingUser) {
    return NextResponse.json({ error: "No such user" }, { status: 403 });
  }

  const userOffers = await Offer.find({ user: userID });

  return NextResponse.json({
    status: StatusCodes.OK,
    userOffers,
  });
}
