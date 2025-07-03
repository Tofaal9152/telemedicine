import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "@/lib/session";
import Aavtar from "./Aavtar";
import UserButtonPopover from "./UserButtonPopover";

const Profile = async () => {
  const session = await getSession();
  if (!session) {
    return <Aavtar className="w-8 h-8" />;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Aavtar className="w-8 h-8" />
      </PopoverTrigger>
      <PopoverContent className=" dark:bg-slate-950">
        <UserButtonPopover session={session}  />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
