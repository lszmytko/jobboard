import axios from "axios";

const adminLoginEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/loginadmin`;

export const loginAdmin = async (data: { name: string; password: string }) => {
  const response = await axios.post(adminLoginEndpoint, {
    ...data,
  });

  return response;
};