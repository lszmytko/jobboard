import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";

export const editOffer = async (data: Offer, withToken?: boolean) => {
  const token = withToken ? getUserToken() : null;

  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const response = await axios.request({
    ...headers,
    method: "PUT",
    url: `http://localhost:3000/api/editoffer`,
    data,
  });

  return response;
};
