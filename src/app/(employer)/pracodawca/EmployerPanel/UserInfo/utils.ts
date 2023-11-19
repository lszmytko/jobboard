import axios from "axios";

import { getUserFromLocalStorage, getUserToken } from "@/utils/utils";

import { UserInfo } from "./UserInfo.types";
import { User } from "@/common/types";

const userDataEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userdata`;

export const updateUserData = async (data: UserInfo) => {
  const userToken = getUserToken();
  const user = getUserFromLocalStorage();

  let response;
  try {
    response = await axios.post(
      userDataEndpoint,
      {
        user,
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }

  return response;
};

type ResponseStructure = { user: User[] };

export const fetchUserData = async (userID: string) => {
  const response = await axios.get<ResponseStructure>(userDataEndpoint, {
    params: {
      userID,
    },
  });

  return response;
};
