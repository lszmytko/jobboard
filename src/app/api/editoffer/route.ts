import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../db/connectToDatabase";
import { User } from "../models/User";
import { auth } from "../middleware/auth";
import { AxiosRequestHeaders } from "axios";
import { Offer } from "../models/Offer";

const schema = z.object({
  post: z.string(),
  user: z.string().nullable().optional(),
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

export async function PUT(req: AxiosRequestHeaders) {
  await connectToDatabase();
  const request = await req.json();
  const validation = schema.safeParse(request);
  const authHeader = req.headers.get("authorization");

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

  if (authHeader) {
    const isAuthorized = auth(req);

    if (!isAuthorized) {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 403 }
      );
    }
  }

  const timeOfPosting = new Date().toISOString();

  console.log("*** timeOfPosting ***", timeOfPosting);

  const updatedOffer = await Offer.findOneAndUpdate(
    { _id: request._id },
    {
      ...request,
      timeOfPosting,
    }
  );

  if (!updatedOffer) {
    return NextResponse.json({ message: "No such offer" }, { status: 400 });
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
