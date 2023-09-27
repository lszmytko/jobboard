import axios from "axios";

export const updateUserData = async () => {
  const userToken = localStorage.getItem("userToken");
  const user = localStorage.getItem("user");
  const response = await axios.post("http://localhost:3000/api/userdata", {
    user,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  console.log(response);

  return response;
};

export const fetchUserData = async (userID: string) => {
  const response = await axios.get("http://localhost:3000/api/userdata", {
    params: {
      userID,
    },
  });

  console.log(response);

  return response;
};
