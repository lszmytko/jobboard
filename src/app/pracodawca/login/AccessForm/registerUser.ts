import axios from "axios";

interface RegisterResponse {
  token: string;
  status: number;
  error: string;
  user: string;
}

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  console.log(
    "*** registerUser",
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/register"
  );

  try {
    const response = await axios.post<RegisterResponse>(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/register",
      {
        email: data.email,
        password: data.password,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
