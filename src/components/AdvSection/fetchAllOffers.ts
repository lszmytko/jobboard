import { paths } from "@/common/paths";
import { Offer } from "@/common/types";
import axios, { AxiosResponse } from "axios";

const offersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${paths.getAllOffers}`;

type ResponseStructure = { offers: Offer[] };

export const fetchAllOffers = async (isActive?: boolean) => {
  const params = isActive ? { params: { isActive } } : {};

  const response = await axios.get<ResponseStructure>(offersEndpoint, params);

  return response;
};
