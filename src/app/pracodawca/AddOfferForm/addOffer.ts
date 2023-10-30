import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";

const DEFAULT_OFFER_ISACTIVE = false;

export const addOffer = async (data: Offer) => {
  const token = getUserToken();
  const finalData = { ...data, isActive: DEFAULT_OFFER_ISACTIVE };

  console.log("*** data", data);
  const response = await axios.post("http://localhost:3000/api/addoffer", {
    ...finalData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
