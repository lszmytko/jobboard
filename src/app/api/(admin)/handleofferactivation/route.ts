import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import connectToDatabase from "../../db/connectToDatabase";
import { Offer } from "../../models/Offer";

const schema = z.object({
  id: z.string(),
  option: z.string(),
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

  const timeOfEditing = new Date();

  const status = request.option === "activate" ? "active" : "inactive";

  const updatedOffer = await Offer.findOneAndUpdate(
    { _id: request.id },
    {
      ...request,
      status,
      timeOfEditing,
    }
  );

  if (!updatedOffer) {
    return NextResponse.json({ message: "No offer found" }, { status: 400 });
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
