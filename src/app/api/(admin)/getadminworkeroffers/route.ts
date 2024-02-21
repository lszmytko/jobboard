import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
import { WorkerOffer } from "../../models/WorkerOffer";
import connectToDatabase from "../../db/connectToDatabase";
import { z } from "zod";

const schema = z.object({
  email: z.string().nullable().optional(),
  offerID: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  minDate: z.string().nullable().optional(),
  maxDate: z.string().nullable().optional(),
  page: z.number().nullable().optional(),
});

const ITEMS_PER_PAGE = 15;

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const email = req.nextUrl.searchParams.get("email");
  const offerID = req.nextUrl.searchParams.get("offerID");
  const city = req.nextUrl.searchParams.get("city");
  const minDate = req.nextUrl.searchParams.get("minDate");
  const maxDate = req.nextUrl.searchParams.get("maxDate");
  const page = Number(req.nextUrl.searchParams.get("page")) ?? 1;

  const response = schema.safeParse({
    offerID,
    email,
    city,
    minDate,
    maxDate,
    page,
  });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }

  // have to adjust because react-datepicker selects bad hour
  const parsedMaxDate = maxDate ? new Date(maxDate) : new Date("2100-01-01");
  parsedMaxDate.setTime(parsedMaxDate.getTime() + 24 * 60 * 60 * 1000);

  const parsedMinDate = minDate ? minDate : new Date("1970-01-01");

  let filter: {} = {
    timeOfPosting: {
      $gte: parsedMinDate,
      $lte: parsedMaxDate,
    },
  };

  if (email) filter = { ...filter, email: { $regex: email, $options: "i" } };
  if (offerID)
    filter = { ...filter, offerID: { $regex: offerID, $options: "i" } };

  if (city) filter = { ...filter, city: { $regex: city, $options: "i" } };

  let offers;
  let numberOfOffers: number;

  try {
    numberOfOffers = await WorkerOffer.find(filter).count();
    offers = await WorkerOffer.find(filter)
      .sort({ timeOfPosting: -1 })
      .skip((page - 1) * 15)
      .limit(ITEMS_PER_PAGE);
  } catch (e) {
    NextResponse.json(
      { msg: "Something went wrong" },
      { status: StatusCodes.BAD_REQUEST }
    );
    throw e;
  }

  return NextResponse.json(
    {
      offers,
      numberOfOffers,
      hasNextPage: ITEMS_PER_PAGE * page < numberOfOffers,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      pages: Math.ceil(numberOfOffers / ITEMS_PER_PAGE),
    },
    { status: StatusCodes.OK }
  );
}
