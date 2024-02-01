import axios from "axios";

import { OfferData } from "./AddOfferForm";

const DEFAULT_OFFER_ISACTIVE = false;

export const addOffer = async (
  data: OfferData & { creator: "admin" | "employer" }
) => {
  const finalData = { ...data, isActive: DEFAULT_OFFER_ISACTIVE };

  const response = axios.request({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/addoffer`,
    data: finalData,
  });

  return response;
};
