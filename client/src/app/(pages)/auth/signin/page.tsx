import SigninForm from "@/components/pages/auth/SigninForm";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-lg shadow-md border">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {/* Form */}
        <SigninForm />
        <p className="mt-4 text-sm ">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="hover:underline text-gray-500">
            Sign Up
          </Link>
        </p>
        {/* <Button asChild variant="outline" className="w-full">
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`}
            className="mt-4 text-sm  text-gray-400"
          >
            Sign in with Google
          </a>
        </Button> */}
      </div>
    </section>
  );
};

export default page;
