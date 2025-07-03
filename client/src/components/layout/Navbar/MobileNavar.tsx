import SignButton from "@/components/pages/auth/SignButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import ModeToggle from "@/components/ui/ModeToggle";

const MobileNavbar = ({
  navItems,
}: {
  navItems: { name: string; link: string; icon?: React.ReactNode }[];
}) => {
  return (
    <Sheet>
      {/* Hamburger Icon Trigger */}
      <SheetTrigger
        aria-label="Open menu"
        className="md:hidden block cursor-pointer"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </SheetTrigger>

      {/* Slide-Down Menu Content */}
      <SheetContent
        side="left"
        className="bg-gradient-to-b from-red-950 via-red-800 to-red-950 text-white w-64 p-4 md:hidden"
      >
        <div className="flex flex-col items-center">
          <SheetHeader className="text-center">
            <SheetTitle className="text-xl font-bold text-pink-200">
              Menu
            </SheetTitle>
            <SheetDescription className="text-sm text-pink-100 ">
              Navigate through the site
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-4 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <SheetTrigger asChild>
                <Link
                  href={item.link}
                  className="flex items-center gap-2 text-pink-100 font-medium hover:underline"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SheetTrigger>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <ModeToggle />
          <SignButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
