import axios from "axios";

import { WorkerOffer } from "@/common/types";
import { apiRoutes } from "@/common/paths";

const singleOfferEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getSingleWorkerOffer}`;

interface fetchOfferResponse {
  data: { offer: WorkerOffer };
}

export const fetchSingleWorkerOffer = async (
  offerID: string
): Promise<fetchOfferResponse> => {
  const response = await axios.get(singleOfferEndpoint, {
    params: {
      offerID,
    },
  });

  return response;
};
