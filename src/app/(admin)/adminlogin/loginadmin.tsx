import { removeUserFromLocalStorage, removeUserToken } from "@/utils/utils";
import axios from "axios";

const adminLoginEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/loginadmin`;

export const loginAdmin = async (data: { name: string; password: string }) => {
  const response = await axios.post(adminLoginEndpoint, {
    ...data,
  });

  if (response.data.token) {
    localStorage.setItem("adminToken", response.data.token);
    removeUserFromLocalStorage();
    removeUserToken();
  }

  return response;
};
