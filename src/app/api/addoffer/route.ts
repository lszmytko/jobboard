import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../db/connectToDatabase";
import { AxiosRequestHeaders } from "axios";
import { Offer } from "../models/Offer";

const schema = z.object({
  post: z.string(),
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
  aboutCompany: z.string(),
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

  const timeOfPosting = new Date().toISOString();

  console.log({ timeOfPosting });

  try {
    await Offer.create({ ...request, timeOfPosting, status: "pending" });
  } catch (error) {
    throw new Error("Failed to create offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
