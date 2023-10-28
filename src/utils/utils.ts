export const checkIfUserIsLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return true;
  }
  return false;
};

export const getUserToken = () => {
  return localStorage.getItem("userToken");
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem("user");
};
