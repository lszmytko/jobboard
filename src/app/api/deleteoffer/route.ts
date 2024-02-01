import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { WorkerOffer } from "../models/WorkerOffer";

const schema = z.object({
  offerID: z.string(),
  type: z.string(),
});

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const offerID = req.nextUrl.searchParams.get("offerID");
  const type = req.nextUrl.searchParams.get("type");

  const response = schema.safeParse({ offerID, type });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }

  const model = type === "worker" ? WorkerOffer : Offer;

  const deletedOffer = await model.findOneAndDelete({ _id: offerID });

  if (!deletedOffer) {
    return NextResponse.json({ error: "No such offer" }, { status: 403 });
  }

  return NextResponse.json(
    {
      message: "Offer deleted",
    },
    {
      status: StatusCodes.OK,
    }
  );
}
