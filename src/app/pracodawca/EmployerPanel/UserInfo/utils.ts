import axios from "axios";

import { UserInfo } from "./UserInfo.types";

const userDataEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userdata`;

export const updateUserData = async (data: UserInfo) => {
  const userToken = localStorage.getItem("userToken");
  const user = localStorage.getItem("user");
  const response = await axios.post(userDataEndpoint, {
    user,
    ...data,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
};

export const fetchUserData = async (userID: string) => {
  const response = await axios.get(userDataEndpoint, {
    params: {
      userID,
    },
  });

  return response;
};
