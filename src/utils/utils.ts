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
  maxLength: number = 100,
  ellipsis: boolean = true
): string {
  if (str.length <= maxLength) {
    return str;
  }

  const shortened = str.substring(0, maxLength);
  return ellipsis ? `${shortened}...` : shortened;
}
