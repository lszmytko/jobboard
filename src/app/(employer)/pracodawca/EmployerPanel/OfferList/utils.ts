import axios from "axios";

import { getUserToken } from "@/utils/utils";
import { Offer } from "@/common/types";

const userOffersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/getuseroffers`;

interface UserOffersResponse {
  data: { userOffers: Offer[] };
}

export const fetchUserOffers = async (
  userID: string
): Promise<UserOffersResponse> => {
  const userToken = getUserToken();

  const response = await axios.get(userOffersEndpoint, {
    params: {
      user: userID,
    },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
};
