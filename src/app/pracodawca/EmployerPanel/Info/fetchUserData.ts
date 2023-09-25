import axios from "axios";

import { InfoInputs } from "./Info";

export const fetchUserData = async (data: InfoInputs) => {
  console.log("*** data", data);
  const userToken = localStorage.getItem("userToken");
  const user = localStorage.getItem("user");
  const response = await axios.post("http://localhost:3000/api/userData", {
    ...data,
    user,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
};
