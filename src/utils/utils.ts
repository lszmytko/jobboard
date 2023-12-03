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

export const removeUserToken = () => {
  localStorage.removeItem("userToken");
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const parseRequirements = (
  requirements: {
    name: string;
  }[]
) => {
  return requirements.map((requirement) => requirement.name);
};

export const parseTasks = (
  tasks: {
    name: string;
  }[]
) => {
  return tasks.map((task) => task.name);
};
