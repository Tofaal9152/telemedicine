"use client";

import { AppSidebarContent } from "@/components/pages/dashboard/AppSidebar/AppSidebarContent";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  getSidebarNavItems,
  SingleItemAnalytics,
  SingleItemCourses,
} from "@/constants/navitems";
import { AppSidebarHeader } from "./AppSidebarHeader";
import SingleComponentsidebar from "./SingleComponentsidebar";

export function AppSidebar({ session, ...props }: any) {
  const { setOpenMobile, openMobile } = useSidebar();
  const SidebarNavItems = getSidebarNavItems(session);
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <AppSidebarHeader session={session} />
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard for admin and student */}
        <SingleComponentsidebar
          title={"Analytics & Reports"}
          openMobile={openMobile}
          setOpenMobile={setOpenMobile}
          items={SingleItemAnalytics.item}
        />
        {session?.user.role === "STUDENT" ? (
          // for student
          <>
            <SingleComponentsidebar
              title={"Courses & Exams"}
              openMobile={openMobile}
              setOpenMobile={setOpenMobile}
              items={SingleItemCourses.item}
            />
          </>
        ) : (
          // for admin
          <AppSidebarContent
            title={"Management"}
            items={SidebarNavItems.navMain}
          />
        )}
      </SidebarContent>

      {/* for mobile view */}
      <SidebarRail />
    </Sidebar>
  );
}
