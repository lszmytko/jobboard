import axios from "axios";

import { Offer } from "@/common/types";

export const addOffer = async (data: Offer) => {
  console.log("*** data", data);
  const token = localStorage.getItem("userToken");
  const response = await axios.post("http://localhost:3000/api/addoffer", {
    ...data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
