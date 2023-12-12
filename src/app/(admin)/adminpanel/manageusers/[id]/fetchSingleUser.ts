import axios from "axios";

import { apiRoutes } from "@/common/paths";
import { User } from "@/common/types";

const singleUserEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getSingleUser}`;

interface Response {
  data: {
    user: User;
    message: string;
  };
}

export const fetchSingleUser = async (
  userID: string | undefined
): Promise<Response> => {
  const response = await axios.get(singleUserEndpoint, {
    params: {
      userID,
    },
  });

  return response;
};
