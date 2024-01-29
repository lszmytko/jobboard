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
    url: `http://localhost:3000/api/addworkeroffer`,
    data,
  });

  return response;
};
