import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = 15;

const schema = z.object({
  isActive: z.string().nullable().optional(),
  page: z.string(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const isActive = req.nextUrl.searchParams.get("isActive");
  const page = req.nextUrl.searchParams.get("page");

  const response = schema.safeParse({ isActive, page });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  let offers;
  let numberOfOffers: number;

  const filter = isActive ? { isActive } : {};

  try {
    numberOfOffers = await Offer.find(filter).count();
    offers = await Offer.find(filter)
      .skip((page - 1) * 15)
      .limit(ITEMS_PER_PAGE);
  } catch (e) {
    throw e;
  }

  if (offers.length) {
    return NextResponse.json(
      {
        offers,
        numberOfOffers,
        hasNextPage: ITEMS_PER_PAGE * page < numberOfOffers,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(numberOfOffers / ITEMS_PER_PAGE),
      },
      { status: StatusCodes.OK }
    );
  } else {
    return NextResponse.json(
      { offers, numberOfOffers },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
