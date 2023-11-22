import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";

export const editOffer = async (data: Offer) => {
  const token = getUserToken();
  const finalData = { ...data };

  const response = axios.request({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    url: `http://localhost:3000/api/editoffer`,
    data: finalData,
  });

  return response;
};
