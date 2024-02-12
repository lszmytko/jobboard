import { paths } from "@/common/paths";
import { Offer } from "@/common/types";
import axios, { AxiosResponse } from "axios";

const offersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${paths.getAllOffers}`;

type ResponseStructure = { offers: Offer[]; pages: number };
type Params = {
  city?: string;
  postOrCompany?: string;
  page: string;
  company?: string;
  offerID?: string;
  minDate?: string;
  maxDate?: string;
};

export const fetchAllOffers = async ({
  isActive,
  params,
}: {
  isActive?: boolean;
  params?: Params;
}) => {
  const finalParams = isActive
    ? { params: { isActive, ...params } }
    : { params: { ...params } };

  const response = await axios.get<ResponseStructure>(
    offersEndpoint,
    finalParams
  );

  return response;
};
