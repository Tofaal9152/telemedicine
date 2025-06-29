"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader } from "lucide-react";

const SignOutBtn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/signout`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      if (data.success) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Signout failed:", data.message);
      }
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="text-red-500 text-xs font-semibold flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <Loader className="animate-spin w-4 h-4" />
      ) : (
        <LogOut size={16} />
      )}
      Sign Out
    </button>
  );
};

export default SignOutBtn;
