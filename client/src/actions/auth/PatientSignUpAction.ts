"use server";
import apiServer from "@/lib/apiServer";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { PatientRegisterType } from "@/types/auth";
import { PatientRegisterSchema } from "@/zod-schemas/auth";
import { redirect } from "next/navigation";

export const PatientSignUpAction = async (
  previousState: PatientRegisterType,
  formData: FormData
): Promise<PatientRegisterType> => {
  const validationErrors = validateForm(PatientRegisterSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await apiServer.post(`/auth/patient/signup`, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    });

    console.log(res.data);
  } catch (error) {
    return HandleError(error);
  }
  redirect("/auth/signin");
};
