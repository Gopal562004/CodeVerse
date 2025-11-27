// // import React from "react";
// // import { NavLink, useLocation } from "react-router-dom";
// // import { bottombarLinks } from "../../constants";
// // import { IoMdHome } from "react-icons/io";
// // import { MdExplore } from "react-icons/md";
// // import { FaUserFriends, FaSave } from "react-icons/fa";
// // import { RiAddBoxFill } from "react-icons/ri";
// // import { IoMdNotifications } from "react-icons/io";

// // const iconMapping = {
// //   IoMdHome: <IoMdHome />,
// //   MdExplore: <MdExplore />,
// //   FaUserFriends: <FaUserFriends />,
// //   FaSave: <FaSave />,
// //   RiAddBoxFill: <RiAddBoxFill />,
// //   IoMdNotifications: <IoMdNotifications />,
// // };

// // const Bottombar = () => {
// //   const { pathname } = useLocation();

// //   return (
// //     <div className="md:hidden fixed bottom-0 w-full shadow-md bg-gray-900">
// //       <nav className="bottom-bar flex justify-around p-2">
// //         {bottombarLinks.map((link) => (
// //           <NavLink
// //             key={link.route}
// //             to={link.route}
// //             className={({ isActive }) =>
// //               `flex flex-col items-center gap-1 transition-colors duration-300 ${
// //                 isActive ? "text-blue-500 font-bold" : "text-gray-700"
// //               }`
// //             }
// //           >
// //             {iconMapping[link.icon]}
// //             <span className="text-sm hover:text-blue-500 transition-colors duration-200">
// //               {link.label}
// //             </span>
// //           </NavLink>
// //         ))}
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Bottombar;


// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { bottombarLinks } from "../../constants";
// import {
//   Home,
//   Search,
//   Users,
//   Bookmark,
//   PlusSquare,
//   Bell
// } from "lucide-react";

// const Bottombar = () => {
//   const { pathname } = useLocation();

//   // Function to render icon based on route
//   const renderIcon = (route, isActive) => {
//     const iconClass = isActive ? "text-blue-600" : "text-gray-400";
    
//     switch (route) {
//       case "/":
//         return <Home size={22} className={iconClass} />;
//       case "/explore":
//         return <Search size={22} className={iconClass} />;
//       case "/people":
//         return <Users size={22} className={iconClass} />;
//       case "/saved":
//         return <Bookmark size={22} className={iconClass} />;
//       case "/create-post":
//         return <PlusSquare size={22} className={iconClass} />;
//       case "/notifications":
//         return <Bell size={22} className={iconClass} />;
//       default:
//         return <Home size={22} className={iconClass} />;
//     }
//   };

//   return (
//     <div className="md:hidden fixed bottom-0 w-full border-t border-gray-800 bg-[#0a0f1f] z-50">
//       <nav className="bottom-bar flex justify-around py-3 px-2">
//         {bottombarLinks.map((link) => {
//           const isActive = pathname === link.route;
          
//           return (
//             <NavLink
//               key={link.route}
//               to={link.route}
//               className="flex flex-col items-center gap-1 transition-all duration-300"
//             >
//               <div className={`p-2 rounded-lg transition-colors ${
//                 isActive 
//                   ? "bg-blue-600/10" 
//                   : "hover:bg-gray-800"
//               }`}>
//                 {renderIcon(link.route, isActive)}
//               </div>
//               <span className={`text-xs transition-colors ${
//                 isActive ? "text-blue-600 font-medium" : "text-gray-400"
//               }`}>
//                 {link.label}
//               </span>
//             </NavLink>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Bottombar;


import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../constants";
import { Home, Search, Users, Bookmark, PlusSquare, Bell } from "lucide-react";

const Bottombar = () => {
  const { pathname } = useLocation();

  // Function to render icon based on route
  const renderIcon = (route, isActive) => {
    const iconClass = isActive ? "text-blue-600" : "text-gray-400";

    switch (route) {
      case "/":
        return <Home size={22} className={iconClass} />;
      case "/explore":
        return <Search size={22} className={iconClass} />;
      case "/people":
        return <Users size={22} className={iconClass} />;
      case "/saved":
        return <Bookmark size={22} className={iconClass} />;
      case "/create-post":
        return <PlusSquare size={22} className={iconClass} />;
      case "/notifications":
        return <Bell size={22} className={iconClass} />;
      default:
        return <Home size={22} className={iconClass} />;
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 w-full border-t border-gray-800 bg-[#0a0f1f] z-50">
      <nav className="flex justify-around py-2">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <NavLink
              key={link.route}
              to={link.route}
              className="flex flex-col items-center gap-0.5 transition-all duration-300 flex-1 py-1"
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600/10" : "hover:bg-gray-800"
                }`}
              >
                {renderIcon(link.route, isActive)}
              </div>
              <span
                className={`text-[10px] transition-colors ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-400"
                }`}
              >
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Bottombar;