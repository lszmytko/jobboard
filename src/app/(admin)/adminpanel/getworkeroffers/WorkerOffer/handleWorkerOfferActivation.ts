import { apiRoutes } from "@/common/paths";
import axios from "axios";

const activateOfferEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiRoutes.handleWorkerOfferActivation}`;

export const handleWorkerOfferActivation = async ({
  id,
  option,
}: {
  id: string;
  option: "activate" | "deactivate";
}) => {
  const response = await axios.put(activateOfferEndpoint, {
    id,
    option,
  });

  return response;
};
