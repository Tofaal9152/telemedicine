import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebarHeader({session}: { session: any }) {
  const activeTeam = {
    name: "Ra Physics",
    logo: "/images/raPhysicsLogo.png",
    plan: "Back",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-white"
          >
            <Image
              src={activeTeam.logo}
              width={35}
              height={35}
              alt="logo"
              className="rounded-md p-1 mr-2 "
            />
            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <span className="truncate text-xs ">
                {/* <ArrowLeft size={16} className="inline-block mr-1" />
                {activeTeam.plan} */}
                ({session?.user?.role || "Guest User"})
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
