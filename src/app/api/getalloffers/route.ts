import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const ITEMS_PER_PAGE = 15;

const schema = z.object({
  isActive: z.string().nullable().optional(),
  page: z.string(),
  city: z.string().nullable().optional(),
  postOrCompany: z.string().nullable().optional(),
});

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const isActive = req.nextUrl.searchParams.get("isActive");
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const city = req.nextUrl.searchParams.get("city");
  const postOrCompany = req.nextUrl.searchParams.get("postOrCompany");
  const company = req.nextUrl.searchParams.get("company");
  const offerID = req.nextUrl.searchParams.get("offerID");

  const response = schema.safeParse({ isActive, page, city, postOrCompany });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  let offers;
  let numberOfOffers: number;

  let filter = {};
  filter = company
    ? { ...filter, company: { $regex: company, $options: "i" } }
    : { ...filter };
  filter = offerID
    ? {
        ...filter,
        _id: new mongoose.Types.ObjectId(offerID),
      }
    : { ...filter };
  filter = isActive ? { ...filter, isActive } : { ...filter };
  filter = city ? { ...filter, city } : { ...filter };
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
