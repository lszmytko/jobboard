import { NextResponse } from "next/server";
import { z } from "zod";
import { AxiosRequestHeaders } from "axios";
import { StatusCodes } from "http-status-codes";

import connectToDatabase from "../db/connectToDatabase";
import { Offer } from "../models/Offer";
import { auth } from "../middleware/auth";

const schema = z.object({
  offerID: z.string(),
});

export async function DELETE(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const offerID = req.nextUrl.searchParams.get("offerID");

  const response = schema.safeParse({ offerID });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      error: { message: "Invalid request", errors },
      status: 400,
    });
  }

  //   const isAuthorized = auth(req);

  //   if (!isAuthorized) {
  //     return NextResponse.json(
  //       { message: "You are not authorized" },
  //       { status: 403 }
  //     );
  //   }

  const deletedOffer = await Offer.findOneAndDelete({ _id: offerID });

  if (!deletedOffer) {
    return NextResponse.json({ error: "No such user" }, { status: 403 });
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
