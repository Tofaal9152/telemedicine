"use client";

import { DoctorSignUpAction } from "@/actions/auth/DoctorSignUpAction";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import SelectGender from "../dashboard/agentControl/SelectGender";
const DoctorSignupForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(DoctorSignUpAction, {
    errors: {},
  });
  useEffect(() => {
    if (state.success && !isPending) {
      router.push("/auth/signin");
      toast.success(state.message);
    }
  }, [state.success, state.message, isPending, router]);
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

      <SelectGender />
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
      <Input name="visitFee" type="number" placeholder="Visit Fee" />
      {state.errors.visitFee && (
        <p className="text-red-500 text-sm">{state.errors.visitFee}</p>
      )}
      <Input name="registrationNumber" type="number" placeholder="BMDC Registration Number" />
      {state.errors.registrationNumber && (
        <p className="text-red-500 text-sm">{state.errors.registrationNumber}</p>
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
