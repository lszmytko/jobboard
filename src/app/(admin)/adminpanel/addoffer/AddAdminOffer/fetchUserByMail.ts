import axios from "axios";

import { apiRoutes } from "@/common/paths";

const userByEmailEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getUserByEmail}`;

interface fetchOfferResponse {
  data: { users: { userID: string; email: string }[] };
}

export const fetchUserByEmail = async (
  email: string
): Promise<fetchOfferResponse> => {
  const response = await axios.get(userByEmailEndpoint, {
    params: {
      email,
    },
  });

  return response;
};
