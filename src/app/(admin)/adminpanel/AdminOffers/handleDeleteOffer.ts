import axios from "axios";

export const handleDeleteOffer = async ({
  offerID,
  type,
}: {
  offerID: string;
  type: "worker" | "employer";
}) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/deleteoffer`, {
    params: {
      offerID,
      type,
    },
  });
};
