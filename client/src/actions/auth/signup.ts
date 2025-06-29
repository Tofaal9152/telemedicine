"use server";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { RegisterType } from "@/types/auth";
import { RegisterSchema } from "@/zod-schemas/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const SignUpAction = async (
  previousState: RegisterType,
  formData: FormData
): Promise<RegisterType> => {
  const validationErrors = validateForm(RegisterSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      {
        name: formData.get("name"),
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

    console.log(res.data);
  } catch (error) {
    return HandleError(error);
  }
  redirect("/auth/signin");
};
