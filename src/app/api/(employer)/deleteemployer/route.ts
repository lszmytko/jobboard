import { NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { AxiosRequestHeaders } from "axios";
import mongoose from "mongoose";

import { User } from "../../models/User";
import connectToDatabase from "../../db/connectToDatabase";
import { auth } from "../../middleware/auth";
import { Offer } from "../../models/Offer";

const schema = z.object({
  user: z.string(),
});

export async function DELETE(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const authHeader = req.headers.get("authorization");
  const user = req.nextUrl.searchParams.get("user");

  const response = schema.safeParse({
    user,
  });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const existingUser = await User.findOne({ _id: user });

  if (!existingUser) {
    return NextResponse.json(
      { error: "No such user" },
      { status: StatusCodes.FORBIDDEN }
    );
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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const offersDeleted = await Offer.deleteMany({ user }).session(session);
    const userDeleted = await User.findOneAndDelete({
      _id: user,
    }).session(session);

    if (!userDeleted) throw new Error("No user deleted");

    await session.commitTransaction();

    return NextResponse.json(
      {
        message: "User deleted",
      },
      {
        status: StatusCodes.OK,
      }
    );
  } catch (e) {
    await session.abortTransaction();
    return NextResponse.json(
      {
        message: "User deletion failed",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  } finally {
    session.endSession();
  }
}
