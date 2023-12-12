import axios from "axios";

import { apiRoutes } from "@/common/paths";

const userByEmailEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getUserByEmail}`;

interface fetchOfferResponse {
  data: {
    users: {
      _id: string;
      email: string;
      isActive: boolean;
      company: string;
    }[];
    pages: number;
  };
}

export const fetchUserByEmail = async (
  email: string,
  page: string
): Promise<fetchOfferResponse> => {
  const response = await axios.get(userByEmailEndpoint, {
    params: {
      email,
      page,
    },
  });

  return response;
};
