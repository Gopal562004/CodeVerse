import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../constants";
import { IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { FaUserFriends, FaSave } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";

const iconMapping = {
  IoMdHome: <IoMdHome />,
  MdExplore: <MdExplore />,
  FaUserFriends: <FaUserFriends />,
  FaSave: <FaSave />,
  RiAddBoxFill: <RiAddBoxFill />,
  IoMdNotifications: <IoMdNotifications />,
};

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 w-full shadow-md bg-gray-900">
      <nav className="bottom-bar flex justify-around p-2">
        {bottombarLinks.map((link) => (
          <NavLink
            key={link.route}
            to={link.route}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }`
            }
          >
            {iconMapping[link.icon]}
            <span className="text-sm hover:text-blue-500 transition-colors duration-200">
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Bottombar;
