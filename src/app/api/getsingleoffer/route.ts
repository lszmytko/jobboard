import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { NextResponse } from "next/server";

const schema = z.object({
  offerID: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const offerID = req.nextUrl.searchParams.get("offerID");

  const response = schema.safeParse({ offerID });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }

  let offer;

  try {
    offer = await Offer.find({ _id: offerID }).then((res) => res[0]);
  } catch (e) {
    throw e;
  }

  if (offer) {
    return NextResponse.json(
      {
        offer,
      },
      { status: StatusCodes.OK }
    );
  } else {
    return NextResponse.json({ offer }, { status: StatusCodes.BAD_REQUEST });
  }
}
