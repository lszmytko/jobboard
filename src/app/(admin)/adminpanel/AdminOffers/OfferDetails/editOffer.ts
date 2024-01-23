import axios from "axios";

import { Offer } from "@/common/types";

export const editOffer = async (data: Offer) => {
  const response = await axios.request({
    method: "PUT",
    url: `http://localhost:3000/api/editoffer`,
    data,
  });

  return response;
};
