import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { Button, Menu, MenuButton, MenuList, MenuItem, Input } from "@chakra-ui/react";
import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
import { useAuth, INITIAL_USER } from "../../context/AuthContext";
import { FaSearch } from "react-icons/fa";

const Topbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("token"); // Remove JWT from local storage
      localStorage.removeItem("user"); // Optionally remove user data if stored
      navigate("/sign-in"); // Redirect to sign-in page after successful sign-out
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error signing out:", isError);
      // Handle error display or logging as needed
    }
  }, [isError]);

  const handleSignOut = async () => {
    try {
      await signOut(); // Trigger sign-out mutation
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error display or logging as needed
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  // Determine the current user to display
  const currentUser = user && user.id ? user : INITIAL_USER;

  return (
    <section className="topbar shadow-md md:hidden">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/codeverselogo.png"
            alt="CodeVerse Logo"
            width={70}
            height={30}
            className="rounded-md"
          />
        </Link>

        <div className="relative flex items-center m-1">
          <Input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="transition-transform duration-300 transform bg-gray-900 
            
             rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 text-gray-500" size={20} />
        </div>

        <Menu>
          <MenuButton as={Button} variant="ghost">
            <img
              src={currentUser.imageUrl || "/assets/images/profile.avif"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </MenuButton>
          <MenuList className="shadow-lg ring-1 ring-black ring-opacity-5 mt-2 bg-gray-900 rounded-md">
            <MenuItem
              as={Link}
              to={`/profile/${currentUser.id}`}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </MenuItem>
            <MenuItem
              as="button"
              onClick={handleSignOut}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <MdLogout size={20} className="inline mr-2" />
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </section>
  );
};

export default Topbar;
