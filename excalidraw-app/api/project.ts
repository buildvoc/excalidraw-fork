// project.ts
import api from "./api";

const APP_URL = import.meta.env.VITE_APP_AUTH_URL;

export const getProjects = async () => {
  const response = await api.get(`${APP_URL}/api/v2/project`);
  return response.data;
};

export const addProject = async ({
  projectName
}: {
  projectName: string;
}) => {
  const response = await api.post(`${APP_URL}/api/v2/project`, {
    projectName,
  });
  return response.data;
};

