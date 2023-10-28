import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";

export const addOffer = async (data: Offer) => {
  const token = getUserToken();
  const response = await axios.post("http://localhost:3000/api/addoffer", {
    ...data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
