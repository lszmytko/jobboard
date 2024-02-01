import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../../db/connectToDatabase";
import { WorkerOffer } from "../../models/WorkerOffer";

const schema = z.object({
  email: z.string(),
  phoneNumber: z.string(),
  city: z.string(),
  experience: z.string(),
  availability: z.array(z.string()),
  offerText: z.string(),
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

  try {
    const offer = await WorkerOffer.findOneAndUpdate(
      { _id: request._id },
      {
        ...request,
        timeOfEditing,
      }
    );

    if (!offer) {
      return NextResponse.json({ message: "Offer not found" }, { status: 400 });
    }
  } catch (error) {
    throw new Error("Failed to create worker offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
