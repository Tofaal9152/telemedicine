"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchData } from "@/hooks/useFetchData";
import SignOutBtn from "../../pages/auth/SignOutBtn";
import {
  default as Aavtar,
  default as CustomAavtar,
} from "../../ui/CustomAavtar";

const PopoverIcon = () => {
  const { data, isLoading } = useFetchData<any>("/user", "user");
  const user = {
    name: data?.name || "example",
    email: data?.email || "example@example.com",
  };
  if (isLoading) {
    return (
      <Popover>
        <PopoverTrigger>
          <CustomAavtar className="w-8 h-8" />
        </PopoverTrigger>
      </Popover>
    );
  }
  return (
    <Popover>
      <PopoverTrigger>
        <CustomAavtar className="w-8 h-8" />
      </PopoverTrigger>
      <PopoverContent className=" dark:bg-slate-950">
        <div className="flex  text-slate-800 dark:text-slate-200 flex-col">
          <div className="flex px-4 py-2 items-center gap-3  pb-3 ">
            <Aavtar className="w-12 h-12" />
            <div>
              <p className="text-sm font-semibold ">{user?.name}</p>
              <p className="text-xs dark:text-slate-300">{user.email}</p>
            </div>
          </div>
          <div className="border-b my-0.5"></div>
          <SignOutBtn />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverIcon;
