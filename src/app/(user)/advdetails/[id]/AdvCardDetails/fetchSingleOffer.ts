import axios from "axios";

import { Offer } from "@/common/types";
import { apiRoutes, paths } from "@/common/paths";

const singleOfferEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getSingleOffer}`;

interface fetchOfferResponse {
  data: { offer: Offer };
}

export const fetchSingleOffer = async (
  offerID: string
): Promise<fetchOfferResponse> => {
  console.log("*** offerID", offerID);
  const response = await axios.get(singleOfferEndpoint, {
    params: {
      offerID,
    },
  });

  return response;
};
