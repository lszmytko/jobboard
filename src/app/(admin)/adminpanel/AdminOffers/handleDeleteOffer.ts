import axios from "axios";

export const handleDeleteOffer = async (offerID: string) => {
  console.log("offerID", offerID);
  try {
    axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/deleteoffer`, {
      params: {
        offerID,
      },
    });
  } catch (error) {
    return error;
  }
};
