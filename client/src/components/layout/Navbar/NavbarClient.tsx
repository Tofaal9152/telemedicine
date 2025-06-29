"use client";

const NavbarClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`transition-colors duration-300 backdrop-blur sticky top-0 left-0 w-full z-50`}
    >
      {children}
    </div>
  );
};

export default NavbarClient;
