import Profile from "@/components/layout/Navbar/Profile/Profile";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

const SignButton = async () => {
  const session = await getSession();

  return (
    <>
      {session ? (
        <Profile />
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/auth/signin">
            <Button variant={"secondary"} className="bg-[#4f3d80] hover:bg-[#3e2f6b] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-4 py-2">
              <LogInIcon /> Login
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
export default SignButton;
