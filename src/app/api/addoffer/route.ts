import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../db/connectToDatabase";
import { User } from "../models/User";
import { auth } from "../middleware/auth";
import { AxiosRequestHeaders } from "axios";
import { Offer } from "../models/Offer";

const schema = z.object({
  post: z.string(),
  user: z.string(),
  company: z.string(),
  agreementType: z.array(z.string()),
  city: z.string(),
  experience: z.string(),
  postLevel: z.string(),
  requirements: z.array(z.string()),
  tasks: z.array(z.string()),
  timeOfPosting: z.string(),
  workingTime: z.array(z.string()),
  offerText: z.string(),
});

export async function POST(req: AxiosRequestHeaders) {
  await connectToDatabase();
  const response = await req.json();
  const validation = schema.safeParse(response);

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ _id: response.user });

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

  try {
    await Offer.create(response);
  } catch (error) {
    throw new Error("Failed to create offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
