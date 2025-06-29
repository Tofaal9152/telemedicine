"use client";
import { SignUpAction } from "@/actions/auth/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action, isPending] = useActionState(SignUpAction, {
    errors: {},
  });
  return (
    <form action={action} className="w-full">
      <Input name="name" type="text" placeholder="Name" className="mb-4" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <Input name="email" type="email" placeholder="Email" className="mb-4" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input
        name="password"
        type="password"
        placeholder="Password"
        className="mb-4"
      />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <Button disabled={isPending} className="w-full">
        Sign Up
      </Button>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default SignupForm;
