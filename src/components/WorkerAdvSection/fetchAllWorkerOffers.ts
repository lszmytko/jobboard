import axios from "axios";

import { apiRoutes } from "@/common/paths";
import { WorkerOffer } from "@/common/types";

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

  const response = await axios.get<ResponseStructure>(
    offersEndpoint,
    parsedParams
  );

  return response;
};
