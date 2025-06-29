import SignButton from "@/components/pages/auth/SignButton";
import { NavbarNavItems } from "@/constants/navitems";
import { getSession } from "@/lib/session";
import Link from "next/link";

import MobileNavbar from "./MobileNavar";
import NavbarClient from "./NavbarClient";
import ModeToggle from "@/components/ui/ModeToggle";

const Navbar = async () => {
  const session = await getSession();
  const NavItems = NavbarNavItems(session?.user);
  return (
    <NavbarClient>
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <MobileNavbar navItems={NavItems.navmain} />
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold ">Up & Pro</h1>
          </Link>
        </div>

        {/* Desktop Nav Items */}
        {/* <ul className="hidden md:flex space-x-6">
          {NavItems.navmain.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="flex items-center gap-2"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul> */}

        {/* Login/Profile */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignButton />
        </div>
      </div>
    </NavbarClient>
  );
};

export default Navbar;
