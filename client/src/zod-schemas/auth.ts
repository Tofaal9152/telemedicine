import {z} from "zod"

export const LoginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(1, "please enter a valid password"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "please enter a valid password"),
});
