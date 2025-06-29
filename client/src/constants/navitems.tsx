import {
  BarChart3,
  BookMarked,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FilePlus2,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  ListChecks,
  Notebook,
  PlusCircle,
  UserPlus,
  Users
} from "lucide-react";

export const NavbarNavItems = (user: any) => {
  return {
    navmain: [
      {
        name: "হোম",
        link: "/",
        icon: <Home size={18} />,
      },
      ...(user
        ? [
            {
              name: "ড্যাশবোর্ড",
              link: "/dashboard",
              icon: <LayoutDashboard size={18} />,
            },
          ]
        : []),
      {
        name: "কোর্সসমূহ",
        link: "/all-courses",
        icon: <GraduationCap size={18} />,
      },
    ],
  };
};

export function getSidebarNavItems(session: any) {
  return {
    navMain: [
      ...(session?.user.role === "ADMIN"
        ? [
            {
              title: "Student Management",
              url: "/",
              icon: Users,
              isActive: true,
              items: [
                {
                  title: "Admit Student",
                  url: "/dashboard/admin/student-management/admit",
                  icon: UserPlus,
                },
                {
                  title: "Manage Students",
                  url: "/dashboard/admin/student-management/",
                  icon: ClipboardList,
                },
              ],
            },
            {
              title: "Course Management",
              url: "/",
              icon: BookOpen,
              isActive: true,
              items: [
                {
                  title: "Add Category",
                  url: "/dashboard/admin/course-management/add-categorie",
                  icon: ListChecks,
                },
                {
                  title: "Add Course",
                  url: "/dashboard/admin/course-management/add-course",
                  icon: FilePlus2,
                },
                {
                  title: "All Courses",
                  url: "/dashboard/admin/course-management/all-courses",
                  icon: Notebook,
                },
              ],
            },
          ]
        : []),
    ],
  };
}

export const SingleItemAnalytics = {
  item: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
  ],
};

export const SingleItemCourses = {
  item: [
    {
      name: "Enrolled Courses",
      url: "/dashboard/student/enrolled-courses",
      icon: BookMarked,
    },
    {
      name: "Previous Exams",
      url: "/dashboard/student/previous-exams",
      icon: FileText,
    },
    {
      name: "Upcoming Exams",
      url: "/dashboard/student/upcoming-exams",
      icon: CalendarDays,
    },
    {
      name: "Add New Course",
      url: "/dashboard/student/add-course",
      icon: PlusCircle,
    },
  ],
};
