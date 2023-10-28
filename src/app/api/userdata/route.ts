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
  currentPassword: z.string().min(6, { message: "Password is too short" }),
  newPassword: z.string().min(6, { message: "Password is too short" }),
  user: z.string().min(6, { message: "User name is wrong" }),
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
      { status: 402 }
    );
  }

  const {
    currentPassword,
    newPassword,
    user,
    companyName,
    city,
    street,
    flatNumber,
    phoneNumber,
  } = response.data;

  const existingUser = await User.findOne({ _id: user });

  if (!existingUser) {
    return NextResponse.json({
      error: { message: "Something wrong with the user", status: 403 },
    });
  }

  const isPasswordCorrect = await existingUser.comparePasswords(
    currentPassword
  );

  if (!isPasswordCorrect) {
    return NextResponse.json({ msg: "Podałeś złe hasło" }, { status: 403 });
  }

  const userData = await UserData.create({
    companyName,
    city,
    street,
    flatNumber,
    phoneNumber,
    newPassword,
    user,
  });

  return NextResponse.json({ msg: "success", user: userData }, { status: 200 });
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const userID = req.nextUrl.searchParams.get("userID");

  const userData = UserData.findOne({ user: userID }).exec();

  return NextResponse.json({ msg: "success", user: userData }, { status: 200 });
}
