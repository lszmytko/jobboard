import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";

const schema = z.object({
  post: z.string(),
  user: z.string().nullable().optional(),
  company: z.string(),
  agreementType: z.array(z.string()),
  city: z.string(),
  experience: z.string(),
  email: z.string(),
  requirements: z.array(z.string()),
  tasks: z.array(z.string()),
  timeOfPosting: z.string(),
  workingTime: z.array(z.string()),
  offerText: z.string(),
  maxSalary: z.string(),
  minSalary: z.string(),
  phoneNumber: z.string(),
});

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const request = await req.json();
  const validation = schema.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const timeOfEditing = new Date().toISOString();

  const updatedOffer = await Offer.findOneAndUpdate(
    { _id: request._id },
    {
      ...request,
      timeOfEditing,
    }
  );

  if (!updatedOffer) {
    return NextResponse.json({ message: "No such offer" }, { status: 400 });
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
