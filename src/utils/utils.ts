export const checkIfUserIsLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return true;
  }
  return false;
};
