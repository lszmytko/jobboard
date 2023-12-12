import { NextResponse } from "next/server";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

import connectToDatabase from "../db/connectToDatabase";
import { Admin } from "../models/Admin";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
    },
  })
);

export async function POST(req: Request) {
  console.log("*** przesłos");
  try {
    return transporter.sendMail({
      to: "lszmytko@gmail.com",
      from: "lszmytko@gmail.com",
      subject: "test",
      html: "<h1>test</h1>",
    });
  } catch (error) {
    console.log(error);
  }
}
