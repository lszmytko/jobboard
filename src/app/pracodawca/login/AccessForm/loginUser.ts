import axios from "axios";

interface ApiResponse {
  token: string;
  status: number;
  error: string;
}

export const loginUser = async (data: { email: string; password: string }) => {
  console.log("*** data", data);
  const response = await axios.post<ApiResponse>(
    "http://localhost:3000/api/login",
    {
      email: data.email,
      password: data.password,
    }
  );
  if (response.data.token)
    localStorage.setItem("userToken", response.data.token);
  return response;
};
