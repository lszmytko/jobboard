import axios from "axios";

import { WorkerOffer } from "@/common/types";

type Args = Pick<
  WorkerOffer,
  | "email"
  | "phoneNumber"
  | "education"
  | "experience"
  | "city"
  | "offerText"
  | "availability"
  | "creator"
>;

export const addWorkerOffer = async (data: Args) => {
  const response = axios.request({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/addworkeroffer`,
    data,
  });

  return response;
};
