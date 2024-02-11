import axios from "axios";

import { apiRoutes } from "@/common/paths";
import { WorkerOffer } from "@/common/types";

const offersEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${apiRoutes.getAdminWorkerOffers}`;

type ResponseStructure = { offers: WorkerOffer[]; pages: number };

export const fetchAdminWorkerOffers = async (data: {
  email: string;
  city: string;
  offerID: string;
  minDate: Date | string;
  maxDate: Date | string;
  page: number;
}) => {
  const parsedParams = {
    params: {
      ...data,
      page: data.page,
    },
  };

  const response = await axios.get<ResponseStructure>(
    offersEndpoint,
    parsedParams
  );

  return response;
};
