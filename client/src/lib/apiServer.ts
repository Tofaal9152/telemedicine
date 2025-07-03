"use server"
import axios from "axios";
import { getSession } from "./session";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default apiServer;
