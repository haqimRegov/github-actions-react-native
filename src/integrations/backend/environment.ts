import axios from "axios";

import { baseURL, configBaseURL, X_API_KEY } from "./env-base";

export const AxiosInstanceIAM = axios.create({
  baseURL: configBaseURL,
  headers: {
    "Content-Type": " application/json",
    "x-api-key": X_API_KEY,
  },
  validateStatus: () => true,
  withCredentials: true,
});

export const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": " application/json",
    "x-api-key": X_API_KEY,
  },
  validateStatus: () => true,
  withCredentials: true,
});

export const SERVICES = {
  CONFIG: "dev",
  GRAPHQL: "graphql",
};
