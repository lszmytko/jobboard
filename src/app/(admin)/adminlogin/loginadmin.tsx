import axios from "axios";
import Cookies from "js-cookie";

const adminLoginEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/loginadmin`;

export const loginAdmin = async (data: { name: string; password: string }) => {
  const response = await axios.post(adminLoginEndpoint, {
    ...data,
  });

  if (response.data.token) {
    localStorage.setItem("adminToken", response.data.token);
    Cookies.set("jwtToken", response.data.token);
  }

  return response;
};
