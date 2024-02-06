import axios from "axios";

import { apiRoutes } from "@/common/paths";
import { WorkerOffer, WorkerOfferFormInputs } from "@/common/types";

const editWorkerOfferEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiRoutes.editworkeroffer}`;

export type ParsedInputs = Omit<WorkerOfferFormInputs, "workingTime"> &
  Pick<WorkerOffer, "workingTime" | "_id">;

export const editWorkerOffer = async (data: ParsedInputs) => {
  const response = await axios.put(editWorkerOfferEndpoint, {
    ...data,
  });

  return response;
};
