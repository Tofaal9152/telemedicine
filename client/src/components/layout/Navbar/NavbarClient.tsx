"use client"

import type React from "react"

const NavbarClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 w-full z-50 bg-white backdrop-blur-md border-b border-white/20 shadow-lg">
      {children}
    </div>
  )
}

export default NavbarClient
// "use client"

// import type React from "react"

// const NavbarClient = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="sticky top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 shadow-lg">
//       {children}
//     </div>
//   )
// }

// export default NavbarClient
