import { CreditCard, Home, LayoutDashboard, PlusCircleIcon, Settings, User } from "lucide-react";

export const NavbarNavItems = (session: any) => {
  return {
    navmain: [
      {
        name: "Home",
        link: "/",
        icon: <Home size={18} />,
      },
      ...(session?.user?.role === "ADMIN"
        ? [
            {
              name: "Dashboard",
              link: "/dashboard",
              icon: <LayoutDashboard size={18} />,
            },
          ]
        : []),
      {
        name: "Profile",
        link: "/profile",
        icon: <User size={18} />,
      },
      {
        name: "Payments",
        link: "/payments",
        icon: <CreditCard size={18} />,
      },
      // settings
      {
        name: "Settings",
        link: "/settings",
        icon: <Settings size={18} />,
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
