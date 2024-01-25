import { NextResponse } from "next/server";
import { AxiosRequestHeaders } from "axios";
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
  creator: z.string(),
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
  const timeOfEditing = "";

  try {
    await WorkerOffer.create({
      ...request,
      timeOfPosting,
      timeOfEditing,
      status: "pending",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create worker offer");
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
