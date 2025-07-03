"use server";
import apiServer from "@/lib/apiServer";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { DoctorRegisterType } from "@/types/auth";
import { DoctorRegisterSchema } from "@/zod-schemas/auth";
import { redirect } from "next/navigation";

export const DoctorSignUpAction = async (
  previousState: DoctorRegisterType,
  formData: FormData
): Promise<DoctorRegisterType> => {
  const validationErrors = validateForm(DoctorRegisterSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await apiServer.post(`/auth/doctor/signup`, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      specialty: formData.get("specialty"),
      experience: formData.get("experience"),
      bio: formData.get("bio"),
    });

    console.log(res.data);
  } catch (error) {
    return HandleError(error);
  }
  redirect("/auth/signin");
};
