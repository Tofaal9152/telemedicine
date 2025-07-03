"use client";

import { DoctorSignUpAction } from "@/actions/auth/DoctorSignUpAction";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
const DoctorSignupForm = () => {
  const [state, action, isPending] = useActionState(DoctorSignUpAction, {
    errors: {},
  });

  return (
    <form action={action} className="w-full gap-4 grid grid-cols-1 mt-4">
      <Input name="name" type="text" placeholder="Name" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <Input name="email" type="email" placeholder="Email" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input name="password" type="password" placeholder="Password" />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <Input name="age" type="number" placeholder="Age" />
      {state.errors.age && (
        <p className="text-red-500 text-sm">{state.errors.age}</p>
      )}

      <Select name="gender">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      {state.errors.gender && (
        <p className="text-red-500 text-sm">{state.errors.gender}</p>
      )}
      <Input name="specialty" type="text" placeholder="Specialty" />
      {state.errors.specialty && (
        <p className="text-red-500 text-sm">{state.errors.specialty}</p>
      )}

      <Input name="experience" type="text" placeholder="Experience" />
      {state.errors.experience && (
        <p className="text-red-500 text-sm">{state.errors.experience}</p>
      )}

      <Input name="bio" type="text" placeholder="Bio" />
      {state.errors.bio && (
        <p className="text-red-500 text-sm">{state.errors.bio}</p>
      )}

      <LoadingButton isLoading={isPending} className="w-full">
        Sign Up
      </LoadingButton>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default DoctorSignupForm;
