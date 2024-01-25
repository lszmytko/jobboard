import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import { NextResponse } from "next/server";
import { WorkerOffer } from "../../models/WorkerOffer";
import connectToDatabase from "../../db/connectToDatabase";

const ITEMS_PER_PAGE = 15;

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();
  const criterium = req.nextUrl.searchParams.get("filterCriteria");
  const page = Number(req.nextUrl.searchParams.get("page")) ?? 1;
  console.log({ page });

  const finalFilter = criterium
    ? {
        $or: [
          { city: new RegExp(criterium, "i") },
          { email: new RegExp(criterium, "i") },
        ],
      }
    : {};

  console.log({ finalFilter });

  let offers;
  let numberOfOffers: number;

  try {
    numberOfOffers = await WorkerOffer.find(finalFilter).count();
    offers = await WorkerOffer.find(finalFilter)
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
