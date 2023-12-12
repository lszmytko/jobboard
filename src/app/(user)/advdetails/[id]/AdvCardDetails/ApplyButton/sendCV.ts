import axios from "axios";

const sendCVEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sendcv`;

export const sendCV = async () => {
  axios.post(sendCVEndpoint, {});
};
