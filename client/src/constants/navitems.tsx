import { BarChartHorizontalBig, GraduationCapIcon, PlusCircleIcon, User } from "lucide-react";

import { Home, LayoutDashboard } from "lucide-react";

export const NavbarNavItems = () => {
  return {
    navmain: [
      {
        name: "Home",
        link: "/",
        icon: <Home size={18} />,
      },
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      {
        name: "Magazine",
        link: "/category",
        icon: <BarChartHorizontalBig size={18} />,
      },
    ],
  };
};
// dashboard
export const SingleItemAnalytics = {
  item: [
    {
      name: "Doctor Control",
      url: "/dashboard",
      icon: PlusCircleIcon,
    },
    {
      name: "Patient Control",
      url: "/dashboard/patient-control",
      icon: User,
    },
  ],
};
