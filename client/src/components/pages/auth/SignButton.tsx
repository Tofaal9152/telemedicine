import PopoverIcon from "@/components/layout/Navbar/PopoverIcon";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

const SignButton = async () => {
  const session = await getSession();

  return (
    <>
      {session ? (
        <PopoverIcon />
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/auth/signin">
            <Button variant={"outline"}>
              <LogInIcon /> Login
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
export default SignButton;
