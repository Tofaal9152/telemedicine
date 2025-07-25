"use client";

import { PatientSignUpAction } from "@/actions/auth/PatientSignUpAction";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";

import { useActionState } from "react";
import SelectGender from "../dashboard/agentControl/SelectGender";
const PatientSignupForm = () => {
  const [state, action, isPending] = useActionState(PatientSignUpAction, {
    errors: {},
  });

  return (
    <form action={action} className="w-full gap-4 grid grid-cols-1 mt-4">
      <Input name="name" required type="text" placeholder="Name" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <Input name="email" required type="email" placeholder="Email" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input name="password" required type="password" placeholder="Password" />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <Input name="age" required type="number" placeholder="Age" />
      {state.errors.age && (
        <p className="text-red-500 text-sm">{state.errors.age}</p>
      )}

      <SelectGender />
      {state.errors.gender && (
        <p className="text-red-500 text-sm">{state.errors.gender}</p>
      )}
      <LoadingButton disabled={isPending} className="w-full">
        Sign Up
      </LoadingButton>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default PatientSignupForm;
