import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";

const schema = z.object({
  post: z.string(),
  company: z.string(),
  agreementType: z.array(z.string()),
  city: z.string(),
  experience: z.string(),
  email: z.string(),
  requirements: z.array(z.string()),
  tasks: z.array(z.string()),
  workingTime: z.array(z.string()),
  offerText: z.string(),
  isActive: z.boolean(),
  creator: z.string(),
  minSalary: z.string(),
  maxSalary: z.string(),
  phoneNumber: z.string(),
  salaryOption: z.string(),
  salaryGrossNet: z.string(),
});

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const request = await req.json();
  console.log("*** request", request);
  const validation = schema.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const timeOfPosting = new Date();

  try {
    await Offer.create({
      ...request,
      timeOfPosting,
      status: "pending",
    });
  } catch (error) {
    throw new Error("Failed to create offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
