import { getUserFromLocalStorage, getUserToken } from "@/utils/utils";
import axios from "axios";

interface ApiResponse {
  token: string;
  status: number;
  error: string;
  user: string;
}

export const deleteEmployer = async () => {
  const token = getUserToken();
  const user = getUserFromLocalStorage();

  const response = axios.request({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
    url: `http://localhost:3000/api/deleteemployer`,
    params: { user },
  });

  return response;
};
