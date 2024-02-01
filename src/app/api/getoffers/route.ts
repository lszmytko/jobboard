import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const schema = z.object({
  company: z.string(),
  offerID: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const offerID = req.nextUrl.searchParams.get("offerID");
  const company = req.nextUrl.searchParams.get("company");

  const response = schema.safeParse({ company, offerID });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  let offers;

  try {
    const offerIDAsObjectId = new mongoose.Types.ObjectId(offerID);
    offers = await Offer.find({ company, _id: offerIDAsObjectId });
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
