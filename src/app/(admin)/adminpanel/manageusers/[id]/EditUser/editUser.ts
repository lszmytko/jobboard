import axios from "axios";

export const editUser = async (data: any) => {
  console.log("*** edituser");
  const response = await axios.request({
    method: "PUT",
    url: `http://localhost:3000/api/edituser`,
    data,
  });

  return response;
};
