"use server";

import axios from "axios";
import { getSession } from "./session";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// 🔥 Handle 401 errors
// apiServer.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 and hasn't already tried refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const session = await getSession();
//       if (!session?.refreshToken) {
//         await destroySession(); // Clear bad cookie
//         redirect("/auth/signin"); // Or return NextResponse.redirect() in middleware
//       }

//       try {
//         // 🔄 Attempt to refresh token
//         const refreshResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
//           { refreshToken: session.refreshToken },
//           { withCredentials: true }
//         );

//         const { accessToken, refreshToken } = refreshResponse.data;

//         // 💾 Update session
//         await updateTokens({ accessToken, refreshToken });

//         // ⏪ Retry original request
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return apiServer(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed", refreshError);
//         await destroySession();
//         redirect("/auth/signin");
//       }
//     }

//     // ❌ Other errors
//     return Promise.reject(error);
//   }
// );

export default apiServer;
