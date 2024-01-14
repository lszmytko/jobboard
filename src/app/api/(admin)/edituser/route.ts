import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { AxiosRequestHeaders } from "axios";
import connectToDatabase from "../../db/connectToDatabase";
import { User } from "../../models/User";

const schema = z.object({
  _id: z.string(),
  email: z.string(),
  city: z.string(),
  companyName: z.string(),
  street: z.string(),
  flatNumber: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
});

export async function PUT(req: AxiosRequestHeaders) {
  await connectToDatabase();
  const request = await req.json();
  console.log("*** request ***", request);
  const validation = schema.safeParse(request);

  if (!validation.success) {
    const { errors } = validation.error;
    console.log("*** errors ***", errors);
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ _id: request._id });

  if (!existingUser) {
    return NextResponse.json({ message: "No such user" }, { status: 400 });
  }

  const timeOfPosting = new Date().toISOString();

  console.log("*** timeOfPosting ***", timeOfPosting);

  const updatedUser = await User.findOneAndUpdate(
    { _id: request._id },
    {
      ...request,
      timeOfPosting,
    }
  );

  if (!updatedUser) {
    return NextResponse.json({ message: "No user found" }, { status: 400 });
  }

  return NextResponse.json({ message: "Request successful" }, { status: 200 });
}
