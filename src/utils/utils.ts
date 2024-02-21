export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
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

export function shortenString(
  str: string,
  maxLength: number = 300,
  ellipsis: boolean = true
): string {
  if (str.length <= maxLength) {
    return str;
  }

  const shortened = str.substring(0, maxLength);
  return ellipsis ? `${shortened}...` : shortened;
}

export const createStyles = (path: string, className: string) => {
  let defaultStyles = { worker: "", allOffers: "", employer: "" };

  //TODO: quick fix, to be refactored
  if (
    path.startsWith("/pracownik") &&
    !path.startsWith("/pracownik/szczegoly")
  ) {
    return { ...defaultStyles, worker: className };
  }

  if (path.startsWith("/pracodawca")) {
    return { ...defaultStyles, employer: className };
  }

  if (path.startsWith("/") || path.startsWith("/pracodawca/szczegoly")) {
    return { ...defaultStyles, allOffers: className };
  }

  return defaultStyles;
};
