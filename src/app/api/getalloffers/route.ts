import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { NextResponse } from "next/server";

const schema = z.object({
  isActive: z.string().nullable().optional(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const isActive = req.nextUrl.searchParams.get("isActive");

  const response = schema.safeParse({ isActive });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  let offers;

  const filter = isActive ? { isActive } : {};

  try {
    offers = await Offer.find(filter);
  } catch (e) {
    throw e;
  }

  if (offers.length) {
    return NextResponse.json(
      {
        offers,
      },
      { status: StatusCodes.OK }
    );
  } else {
    return NextResponse.json({ offers }, { status: StatusCodes.BAD_REQUEST });
  }
}
