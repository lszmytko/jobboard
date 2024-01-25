import axios from "axios";

import { WorkerOffer, creator as creatorType } from "@/common/types";

export const addWorkerOffer = async (
  data: WorkerOffer & { creator: creatorType }
) => {
  const response = axios.request({
    method: "POST",
    url: `http://localhost:3000/api/addworkeroffer`,
    data,
  });

  return response;
};
