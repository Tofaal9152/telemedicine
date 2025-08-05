"use client";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { CreateDoctorAction } from "@/actions/dashboard/create-doctor";
import { Button } from "@/components/ui/button";
import SelectGender from "./SelectGender";
import { Loader } from "lucide-react";
const DoctorControlForm = () => {
  const [state, action, isPending] = useActionState(CreateDoctorAction, {
    errors: {},
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.success && !isPending) {
      toast.success(state.message);
      queryClient.invalidateQueries({
        queryKey: ["admin-all-doctors"],
      });
    }
  }, [state.success, state.message, isPending, queryClient]);

  return (
    <form
      action={action}
      className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md gap-4 grid grid-cols-1"
    >
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
      <Input
        name="registrationNumber"
        type="number"
        placeholder="BMDC Registration Number"
      />
      {state.errors.registrationNumber && (
        <p className="text-red-500 text-sm">
          {state.errors.registrationNumber}
        </p>
      )}
      <Input name="imageUrl" type="file" placeholder="Image URL" />
      {state.errors.imageUrl && (
        <p className="text-red-500 text-sm">{state.errors.imageUrl}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader className="animate-spin mr-2" /> Creating Doctor...
          </>
        ) : (
          "Create Doctor"
        )}
      </Button>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default DoctorControlForm;
