import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { User } from "../models/User";
import connectToDatabase from "../db/connectToDatabase";

const schema = z.object({
  companyName: z.string().nonempty(),
  city: z.string().nonempty(),
  street: z.string().nonempty(),
  flatNumber: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  user: z.string().nonempty(),
});

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();

  const response = schema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        msg: "Podałeś niepełne dane",
        error: errors,
      },
      { status: 400 }
    );
  }

  const { user, companyName, city, street, flatNumber, phoneNumber } =
    response.data;

  const existingUser = await User.findOne({ _id: user });

  if (!existingUser) {
    return NextResponse.json({
      error: { message: "Something wrong with the user", status: 403 },
    });
  }

  existingUser.companyName = companyName;
  existingUser.city = city;
  existingUser.street = street;
  existingUser.flatNumber = flatNumber;
  existingUser.phoneNumber = phoneNumber;

  try {
    const user = await existingUser.save();
  } catch (error) {
    throw error;
  }

  return NextResponse.json(
    { msg: "success", user: existingUser },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const userID = req.nextUrl.searchParams.get("userID");

  const userData = await User.findOne({ _id: userID }).exec();

  console.log("*** tutaj", userData);

  if (!userData)
    return NextResponse.json(
      {
        msg: "Something wrong with the user",
      },
      { status: 400 }
    );

  return NextResponse.json({ msg: "success", user: userData }, { status: 200 });
}
