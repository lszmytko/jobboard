import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
import { WorkerOffer } from "../../models/WorkerOffer";
import connectToDatabase from "../../db/connectToDatabase";

const ITEMS_PER_PAGE = 15;

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const criterium = req.nextUrl.searchParams.get("filterCriteria");
  const isActive = req.nextUrl.searchParams.get("isActive");
  const page = Number(req.nextUrl.searchParams.get("page")) ?? 1;

  const activeFilter = isActive === "true" ? { status: "active" } : {};

  console.log(isActive);

  const finalFilter = criterium
    ? {
        $and: [
          {
            $or: [
              { city: new RegExp(criterium, "i") },
              { email: new RegExp(criterium, "i") },
            ],
          },
          activeFilter,
        ],
      }
    : activeFilter;

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
