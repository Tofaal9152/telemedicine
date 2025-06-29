"use server";
import axios from "axios";

export const RefreshTokenAction = async (oldRefreshToken: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        refreshToken: oldRefreshToken,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res) {
      throw new Error("No response from server!");
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/update`,
      {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      },
      {
        withCredentials: true,
      }
    );

    // Return the new access token
    return res.data.accessToken;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
