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
  workingTime: z.array(z.string()),
  offerText: z.string(),
  isActive: z.boolean(),
});

export async function POST(req: AxiosRequestHeaders) {
  await connectToDatabase();
  const request = await req.json();
  console.log("*** request ***", request);
  const validation = schema.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ _id: request.user });

  if (!existingUser) {
    return NextResponse.json({ message: "No such user" }, { status: 400 });
  }

  if (request.creator === "employer") {
    const isAuthorized = auth(req);

    if (!isAuthorized) {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 403 }
      );
    }
  }

  const timeOfPosting = new Date().toISOString();

  try {
    await Offer.create({ ...request, timeOfPosting, status: "pending" });
  } catch (error) {
    throw new Error("Failed to create offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
