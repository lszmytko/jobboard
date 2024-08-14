import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";

import { citiesWithoutOthersPattern } from "@/common/consts";

const ITEMS_PER_PAGE = 15;

const schema = z.object({
  isActive: z.string().nullable().optional(),
  page: z.number(),
  city: z.string().nullable().optional(),
  postOrCompany: z.string().nullable().optional(),
  minDate: z.string().nullable().optional(),
  maxDate: z.string().nullable().optional(),
});

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const isActive = req.nextUrl.searchParams.get("isActive");
  const page = Number(req.nextUrl.searchParams.get("page") ?? "1");
  const city = req.nextUrl.searchParams.get("city");
  const postOrCompany = req.nextUrl.searchParams.get("postOrCompany");
  const company = req.nextUrl.searchParams.get("company");
  const offerID = req.nextUrl.searchParams.get("offerID");
  const minDate = req.nextUrl.searchParams.get("minDate");
  const maxDate = req.nextUrl.searchParams.get("maxDate");

  const response = schema.safeParse({ isActive, page, city, postOrCompany });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  // have to adjust because react-datepicker selects bad hour
  const parsedMaxDate = maxDate ? new Date(maxDate) : new Date("2100-01-01");
  parsedMaxDate.setTime(parsedMaxDate.getTime() + 24 * 60 * 60 * 1000);

  const parsedMinDate = minDate ? minDate : new Date("1970-01-01");

  let offers;
  let numberOfOffers: number;

  let filter: {} = {
    timeOfPosting: {
      $gte: parsedMinDate,
      $lte: parsedMaxDate,
    },
  };

  if (company)
    filter = { ...filter, company: { $regex: company, $options: "i" } };
  if (offerID)
    filter = {
      ...filter,
      _id: new mongoose.Types.ObjectId(offerID),
    };
  if (isActive === "true") filter = { ...filter, status: "active" };
  if (city) filter = { ...filter, city: { $regex: city, $options: "i" } };
  if (city === "inne")
    filter = {
      ...filter,
      city: { $regex: citiesWithoutOthersPattern, $options: "i" },
    };

  const filterWithCompany = postOrCompany
    ? { ...filter, company: { $regex: postOrCompany, $options: "i" } }
    : { ...filter };
  const filterWithPost = postOrCompany
    ? { ...filter, post: { $regex: postOrCompany, $options: "i" } }
    : { ...filter };

  const finalFilter = {
    $or: [filterWithCompany, filterWithPost],
  };

  try {
    numberOfOffers = await Offer.find(finalFilter).count();
    offers = await Offer.find(finalFilter)
      .sort({ timeOfPosting: -1 })
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
        pages: Math.ceil(numberOfOffers / ITEMS_PER_PAGE),
      },
      { status: StatusCodes.OK }
    );
  } else {
    return NextResponse.json(
      { offers, numberOfOffers },
      { status: StatusCodes.OK }
    );
  }
}
