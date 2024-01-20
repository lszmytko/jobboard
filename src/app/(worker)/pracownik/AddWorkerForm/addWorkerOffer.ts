import axios from "axios";

import { WorkerOffer } from "@/common/types";

export const addWorkerOffer = async (data: WorkerOffer) => {
  const response = axios.request({
    method: "POST",
    url: `http://localhost:3000/api/addworkeroffer`,
    data,
  });

  return response;
};
