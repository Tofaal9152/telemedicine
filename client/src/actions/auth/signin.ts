"use server";
import HandleError from "@/lib/errorHandle";
import { CreateSession } from "@/lib/session";
import { validateForm } from "@/lib/validateForm";
import { LoginType } from "@/types/auth";
import { LoginSchema } from "@/zod-schemas/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const SigninAction = async (
  previousState: LoginType,
  formData: FormData
): Promise<LoginType> => {
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    await CreateSession({
      user: {
        id: res?.data?.user?.id,
        email: res?.data?.user?.email,
        role: res?.data?.user?.role,
      },
      accessToken: res?.data?.accessToken || "",
      refreshToken: res?.data?.refreshToken || "",
    });
  } catch (error) {
    return HandleError(error);
  }

  redirect("/");
};
