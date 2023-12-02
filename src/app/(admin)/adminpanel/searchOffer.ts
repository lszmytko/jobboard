import { Offer } from "@/common/types";
import axios, { AxiosResponse } from "axios";

const offersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/getoffers`;

type ResponseStructure = { offers: Offer[] };

export const searchOffer = async ({
  company,
  offerID,
}: {
  company: string;
  offerID: string;
}) => {
  const response = await axios.get<ResponseStructure>(offersEndpoint, {
    params: {
      company,
      offerID,
    },
  });

  return response;
};
