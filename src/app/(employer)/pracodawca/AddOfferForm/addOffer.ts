import axios from "axios";

import { Offer } from "@/common/types";
import { getUserToken } from "@/utils/utils";
import { OfferData } from "./AddOfferForm";

const DEFAULT_OFFER_ISACTIVE = false;

export const addOffer = async (
  data: OfferData & { creator: "admin" | "employer" }
) => {
  const token = getUserToken();
  const finalData = { ...data, isActive: DEFAULT_OFFER_ISACTIVE };

  const response = axios.request({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    url: `http://localhost:3000/api/addoffer`,
    data: finalData,
  });

  return response;
};
