import ModeToggle from "@/components/ui/ModeToggle";
import Profile from "@/components/Profile/Profile";

import { SidebarTrigger } from "@/components/ui/sidebar";

const SidebarNavbar = () => {
  return (
    <header className="flex h-14 items-center justify-between px-4 border-b sticky top-0 z-10 bg-white dark:bg-gray-950 ">
      {/* Left side: Sidebar + Breadcrumb */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle style={true} />
        {/* Profile icon */}
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default SidebarNavbar;
