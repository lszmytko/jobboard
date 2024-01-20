import { paths, apiRoutes } from "@/common/paths";
import { Offer, WorkerOffer } from "@/common/types";
import axios, { AxiosResponse } from "axios";

const offersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getAllWorkerOffers}`;

type ResponseStructure = { offers: WorkerOffer[]; pages: number };

export const fetchAllWorkerOffers = async (
  filterCriteria: string,
  page: number
) => {
  const parsedParams = filterCriteria
    ? {
        params: {
          filterCriteria,
          page,
        },
      }
    : { params: { page } };

  console.log({ parsedParams });
  const response = await axios.get<ResponseStructure>(
    offersEndpoint,
    parsedParams
  );

  return response;
};
