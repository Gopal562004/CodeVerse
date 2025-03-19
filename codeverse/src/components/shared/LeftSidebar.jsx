// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
// import { useAuth, INITIAL_USER } from "../../context/AuthContext";
// import { sidebarLinks } from "../../constants";
// import { IoMdHome } from "react-icons/io";
// import { MdExplore } from "react-icons/md";
// import { FaUserFriends, FaSave } from "react-icons/fa";
// import { RiAddBoxFill } from "react-icons/ri";
// import { MdLogout } from "react-icons/md";
// import { Button } from "@chakra-ui/react";
// import { FaEnvelope, FaSearch } from "react-icons/fa";

// const iconMapping = {
//   IoMdHome: <IoMdHome />,
//   MdExplore: <MdExplore />,
//   FaUserFriends: <FaUserFriends />,
//   FaSave: <FaSave />,
//   RiAddBoxFill: <RiAddBoxFill />,
//   FaEnvelope: <FaEnvelope />,
//   FaSearch: <FaSearch />,
// };

// const LeftSidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useAuth(); // Retrieve user and authentication status
//   const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [id,setId]=useState("");
//   // useEffect(() => {
//   //   if (isSuccess) {
//   //     localStorage.removeItem("token"); // Remove JWT from local storage
//   //     localStorage.removeItem("user"); // Optionally remove user data if stored
//   //     navigate("/sign-in"); // Redirect to sign-in page after successful sign-out
//   //   }
//   // }, [isSuccess, navigate]);

//   // useEffect(() => {
//   //   if (isError) {
//   //     console.error("Error signing out:", isError);
//   //     // Handle error display or logging as needed
//   //   }
//   // }, [isError]);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigate("/sign-in");
//       useEffect(() => {
//         if (isSuccess) {
//           localStorage.removeItem("token"); // Remove JWT from local storage
//           localStorage.removeItem("user"); // Optionally remove user data if stored
//           navigate("/sign-in"); // Redirect to sign-in page after successful sign-out
          
//         }
//       }, [isSuccess, navigate]);
//           window.location.reload();
//     } catch (error) {
//       console.error("Error signing out:", error);
//       // Handle error display or logging as needed
//     }
//   };

//   const currentUser = user && user.id ? user : INITIAL_USER;
//   //console.log("User from context:", currentUser);

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       try {
//         // Parse JSON string to an object
//         const user = JSON.parse(userJson);
//         // Extract the username and set it to state
//         setUsername(user.username);
//         setName(user.name);
//         setId(user.id);
//         //console.log("Username from localStorage:", user.username);
//         //console.log(user.name);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     } else {
//       console.log("No user data found in localStorage.");
//     }
//   }, []);

//   return (
//     <nav className="leftsidebar h-full hidden md:flex p-5 flex-col justify-between">
//       <div className="flex flex-col gap-11">
//         <Link to="/" className="flex gap-3 items-center">
//           <img
//             src="/assets/images/codeverselogo.png"
//             alt="CodeVerse Logo"
//             width={90}
//             height={30}
//             className="rounded-md"
//           />
//         </Link>

//         <Link to={`/profile/${id}`} className="flex items-center gap-3">
//           <img
//             src={currentUser.imageUrl || "/assets/images/profile.avif"}
//             alt="Profile"
//             className="h-12 w-12 rounded-full"
//           />
//           <div className="flex flex-col">
//             <p className="body-bold">{name}</p>
//             <p className="small-regular text-light-3">@{username}</p>{" "}
//             {/* Display dynamic username */}
//           </div>
//         </Link>

//         <ul className="flex flex-col gap-6">
//           {sidebarLinks.map((link) => (
//             <li key={link.route} className="flex items-center gap-3 pl-3">
//               {iconMapping[link.icon]}
//               <NavLink
//                 to={link.route}
//                 className={({ isActive }) =>
//                   isActive ? "text-blue-500 font-bold" : "text-gray-700"
//                 }
//               >
//                 <span className="hover:text-blue-500 transition-colors duration-200">
//                   {link.label}
//                 </span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//         <Button
//           variant="ghost"
//           className="shadow-button-ghost flex text-gray-700 items-center gap-2
//         pr-52  hover:text-blue-500"
//           onClick={handleSignOut}
//         >
//           <MdLogout size={20} className="text-white" />
//           Logout
//         </Button>
//     </nav>
//   );
// };

// export default LeftSidebar;
//////////////////////////////
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
import { useAuth, INITIAL_USER } from "../../context/AuthContext";
import { sidebarLinks } from "../../constants";
import { IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { FaUserFriends, FaSave } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { FaEnvelope, FaSearch } from "react-icons/fa";

const iconMapping = {
  IoMdHome: <IoMdHome />,
  MdExplore: <MdExplore />,
  FaUserFriends: <FaUserFriends />,
  FaSave: <FaSave />,
  RiAddBoxFill: <RiAddBoxFill />,
  FaEnvelope: <FaEnvelope />,
  FaSearch: <FaSearch />,
};

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Retrieve user
  const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  
const [fileName, setFileName] = useState(null);
  const handleSignOut = async () => {
    try {
      await signOut(); // Perform the sign-out mutation
      localStorage.removeItem("token"); // Remove JWT from local storage
      localStorage.removeItem("codeverse-user"); // Optionally remove user data if stored
      navigate("/sign-in"); // Redirect to sign-in page
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error display or logging as needed
    }
  };

  const currentUser = user && user.id ? user : INITIAL_USER;

  useEffect(() => {
    // Retrieve user data from localStorage
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUsername(user.username);
        setName(user.name);
        setId(user._id);
        setFileName(user.profilePhoto);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);
   const photoUrl =`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${id}%2F${fileName}?alt=media`;
  return (
    <nav className="leftsidebar h-full hidden md:flex p-5 flex-col justify-between">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/codeverselogo.png"
            alt="CodeVerse Logo"
            width={90}
            height={30}
            className="rounded-md"
          />
        </Link>

        <Link to={`/profile/${id}`} className="flex items-center gap-3">
          <img
            src={photoUrl || "/assets/images/profile.avif"}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{name}</p>
            <p className="small-regular text-light-3">@{username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => (
            <li key={link.route} className="flex items-center gap-3 pl-3">
              {iconMapping[link.icon]}
              <NavLink
                to={link.route}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }
              >
                <span className="hover:text-blue-500 transition-colors duration-200">
                  {link.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shadow-button-ghost flex text-gray-700 items-center gap-2 pr-52 hover:text-blue-500"
        onClick={handleSignOut}
      >
        <MdLogout size={20} className="text-white" />
        Logout
      </Button>
    </nav>
  );
};

export default LeftSidebar;
