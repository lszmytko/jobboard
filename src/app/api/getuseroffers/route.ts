import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";

const schema = z.object({
  user: z.string(),
  page: z.number().nullable().optional(),
});

const ITEMS_PER_PAGE = 15;

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const userID = req.nextUrl.searchParams.get("user");
  const page = Number(req.nextUrl.searchParams.get("page") ?? "1");

  const response = schema.safeParse({ user: userID, page });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  const userOffers = await Offer.find({ user: userID })
    .skip((page - 1) * 15)
    .limit(ITEMS_PER_PAGE);

  const numberOfOffers = await Offer.find({ user: userID }).count();

  return NextResponse.json(
    {
      userOffers,
      hasNextPage: ITEMS_PER_PAGE * page < numberOfOffers,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      pages: Math.ceil(numberOfOffers / ITEMS_PER_PAGE),
    },
    {
      status: StatusCodes.OK,
    }
  );
}
