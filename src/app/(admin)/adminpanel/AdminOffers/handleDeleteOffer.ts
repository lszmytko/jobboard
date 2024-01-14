import axios from "axios";

export const handleDeleteOffer = async (offerID: string) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/deleteoffer`, {
      params: {
        offerID,
      },
    });
  } catch (error) {
    return error;
  }
};
