import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(1, "please enter a valid password"),
});

export const PatientRegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum password length is 6 characters"),
  age: z.string().min(1, "Please enter a valid age"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a valid gender",
  }),
});
export const DoctorRegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum password length is 6 characters"),
  age: z.string().min(1, "Please enter a valid age"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a valid gender",
  }),
  specialty: z.string().min(1, "Please enter a valid specialty"),
  experience: z.string().min(1, "Please enter a valid experience"),
  bio: z.string().min(1, "Please enter a valid bio"),
});
