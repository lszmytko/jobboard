import axios from "axios";

import { Offer } from "@/common/types";

export const editOffer = async (data: Offer) => {
  const response = await axios.request({
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/editoffer`,
    data,
  });

  return response;
};
