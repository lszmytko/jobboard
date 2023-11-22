import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";

export const editOffer = async (data: Offer) => {
  const token = getUserToken();
  const finalData = { ...data };

  console.log("*** editOffer");

  const response = await axios.request({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    url: `http://localhost:3000/api/editofferr`,
    data: finalData,
  });

  console.log("*** editOffer response", response);

  return response;
};
