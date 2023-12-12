import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "../../db/connectToDatabase";
import { User } from "../../models/User";
import { AxiosRequestHeaders } from "axios";

const schema = z.object({
  email: z.string(),
  page: z.string().nullable().optional(),
});
const ITEMS_PER_PAGE = 15;

export async function GET(req: AxiosRequestHeaders) {
  await connectToDatabase();

  const email = req.nextUrl.searchParams.get("email");
  const page = req.nextUrl.searchParams.get("page") ?? "1";

  console.log("*** page", page);

  const validation = schema.safeParse({ email, page });

  if (!validation.success) {
    const { errors } = validation.error;
    return NextResponse.json(
      { message: "Validation error", errors },
      { status: 400 }
    );
  }

  const existingUsers = await User.find({
    email: new RegExp("^" + email, "i"),
  })
    .skip((page - 1) * 15)
    .limit(ITEMS_PER_PAGE);

  const numberOfOffers = await User.find({
    email: new RegExp("^" + email, "i"),
  }).count();

  if (!existingUsers.length) {
    return NextResponse.json({ message: "No such users" }, { status: 400 });
  } else
    return NextResponse.json(
      {
        message: "Users found",
        users: existingUsers,
        hasNextPage: ITEMS_PER_PAGE * page < numberOfOffers,
        hasPreviousPage: page > 1,
        nextPage: Number(page) + 1,
        previousPage: page - 1,
        pages: Math.ceil(numberOfOffers / ITEMS_PER_PAGE),
      },
      { status: 200 }
    );
}
