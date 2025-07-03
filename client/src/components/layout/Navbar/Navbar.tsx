import SignButton from "@/components/pages/auth/SignButton";
import ModeToggle from "@/components/ui/ModeToggle";
import { NavbarNavItems } from "@/constants/navitems";
import Link from "next/link";
import Image from "next/image";
import MobileNavbar from "./MobileNavar";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const NavItems = NavbarNavItems();
  return (
    <NavbarClient>
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <MobileNavbar navItems={NavItems.navmain} />
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/up_pro_logo.png"
                alt="Up&Pro Logo"
                fill
                className="scale-150"
              />
            </div>

            <span className="text-2xl md:text-3xl AntonFont font-bold tracking-tight bg-[#4f3d80] bg-clip-text text-transparent">
              Up&Pro
            </span>
          </Link>
        </div>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex space-x-2">
          {NavItems.navmain.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
              className="flex items-center  gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:underline dark:underline-[#4f3d80] text-black"
              >
              {/* <Link
                href={item.link}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 transition-all duration-300 transform hover:scale-105 group"
              > */}
                <span className="text-[#4f3d80] group-hover:text-blue-600 transition-colors duration-300">
                  {item.icon}
                </span>
                <span className="font-semibold text-gray-700  group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                {/* <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span> */}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login/Profile */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl  ">
            <ModeToggle />
          </div>
          <SignButton />
        </div>
      </div>
    </NavbarClient>
  );
};

export default Navbar;
