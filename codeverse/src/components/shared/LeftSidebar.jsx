// // // import React, { useEffect, useState } from "react";
// // // import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// // // import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
// // // import { useAuth, INITIAL_USER } from "../../context/AuthContext";
// // // import { sidebarLinks } from "../../constants";
// // // import { IoMdHome } from "react-icons/io";
// // // import { MdExplore } from "react-icons/md";
// // // import { FaUserFriends, FaSave } from "react-icons/fa";
// // // import { RiAddBoxFill } from "react-icons/ri";
// // // import { MdLogout } from "react-icons/md";
// // // import { Button } from "@chakra-ui/react";
// // // import { FaEnvelope, FaSearch } from "react-icons/fa";

// // // const iconMapping = {
// // //   IoMdHome: <IoMdHome />,
// // //   MdExplore: <MdExplore />,
// // //   FaUserFriends: <FaUserFriends />,
// // //   FaSave: <FaSave />,
// // //   RiAddBoxFill: <RiAddBoxFill />,
// // //   FaEnvelope: <FaEnvelope />,
// // //   FaSearch: <FaSearch />,
// // // };

// // // const LeftSidebar = () => {
// // //   const { pathname } = useLocation();
// // //   const navigate = useNavigate();
// // //   const { user, isAuthenticated } = useAuth(); // Retrieve user and authentication status
// // //   const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
// // //   const [username, setUsername] = useState("");
// // //   const [name, setName] = useState("");
// // //   const [id,setId]=useState("");
// // //   // useEffect(() => {
// // //   //   if (isSuccess) {
// // //   //     localStorage.removeItem("token"); // Remove JWT from local storage
// // //   //     localStorage.removeItem("user"); // Optionally remove user data if stored
// // //   //     navigate("/sign-in"); // Redirect to sign-in page after successful sign-out
// // //   //   }
// // //   // }, [isSuccess, navigate]);

// // //   // useEffect(() => {
// // //   //   if (isError) {
// // //   //     console.error("Error signing out:", isError);
// // //   //     // Handle error display or logging as needed
// // //   //   }
// // //   // }, [isError]);

// // //   const handleSignOut = async () => {
// // //     try {
// // //       await signOut();
// // //       navigate("/sign-in");
// // //       useEffect(() => {
// // //         if (isSuccess) {
// // //           localStorage.removeItem("token"); // Remove JWT from local storage
// // //           localStorage.removeItem("user"); // Optionally remove user data if stored
// // //           navigate("/sign-in"); // Redirect to sign-in page after successful sign-out
          
// // //         }
// // //       }, [isSuccess, navigate]);
// // //           window.location.reload();
// // //     } catch (error) {
// // //       console.error("Error signing out:", error);
// // //       // Handle error display or logging as needed
// // //     }
// // //   };

// // //   const currentUser = user && user.id ? user : INITIAL_USER;
// // //   //console.log("User from context:", currentUser);

// // //   useEffect(() => {
// // //     // Retrieve user data from localStorage
// // //     const userJson = localStorage.getItem("user");
// // //     if (userJson) {
// // //       try {
// // //         // Parse JSON string to an object
// // //         const user = JSON.parse(userJson);
// // //         // Extract the username and set it to state
// // //         setUsername(user.username);
// // //         setName(user.name);
// // //         setId(user.id);
// // //         //console.log("Username from localStorage:", user.username);
// // //         //console.log(user.name);
// // //       } catch (error) {
// // //         console.error("Error parsing user data:", error);
// // //       }
// // //     } else {
// // //       console.log("No user data found in localStorage.");
// // //     }
// // //   }, []);

// // //   return (
// // //     <nav className="leftsidebar h-full hidden md:flex p-5 flex-col justify-between">
// // //       <div className="flex flex-col gap-11">
// // //         <Link to="/" className="flex gap-3 items-center">
// // //           <img
// // //             src="/assets/images/codeverselogo.png"
// // //             alt="CodeVerse Logo"
// // //             width={90}
// // //             height={30}
// // //             className="rounded-md"
// // //           />
// // //         </Link>

// // //         <Link to={`/profile/${id}`} className="flex items-center gap-3">
// // //           <img
// // //             src={currentUser.imageUrl || "/assets/images/profile.avif"}
// // //             alt="Profile"
// // //             className="h-12 w-12 rounded-full"
// // //           />
// // //           <div className="flex flex-col">
// // //             <p className="body-bold">{name}</p>
// // //             <p className="small-regular text-light-3">@{username}</p>{" "}
// // //             {/* Display dynamic username */}
// // //           </div>
// // //         </Link>

// // //         <ul className="flex flex-col gap-6">
// // //           {sidebarLinks.map((link) => (
// // //             <li key={link.route} className="flex items-center gap-3 pl-3">
// // //               {iconMapping[link.icon]}
// // //               <NavLink
// // //                 to={link.route}
// // //                 className={({ isActive }) =>
// // //                   isActive ? "text-blue-500 font-bold" : "text-gray-700"
// // //                 }
// // //               >
// // //                 <span className="hover:text-blue-500 transition-colors duration-200">
// // //                   {link.label}
// // //                 </span>
// // //               </NavLink>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //         <Button
// // //           variant="ghost"
// // //           className="shadow-button-ghost flex text-gray-700 items-center gap-2
// // //         pr-52  hover:text-blue-500"
// // //           onClick={handleSignOut}
// // //         >
// // //           <MdLogout size={20} className="text-white" />
// // //           Logout
// // //         </Button>
// // //     </nav>
// // //   );
// // // };

// // // export default LeftSidebar;
// // //////////////////////////////
// // import React, { useEffect, useState } from "react";
// // import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// // import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
// // import { useAuth, INITIAL_USER } from "../../context/AuthContext";
// // import { sidebarLinks } from "../../constants";
// // import { IoMdHome } from "react-icons/io";
// // import { MdExplore } from "react-icons/md";
// // import { FaUserFriends, FaSave } from "react-icons/fa";
// // import { RiAddBoxFill } from "react-icons/ri";
// // import { MdLogout } from "react-icons/md";
// // import { Button } from "@chakra-ui/react";
// // import { FaEnvelope, FaSearch } from "react-icons/fa";

// // const iconMapping = {
// //   IoMdHome: <IoMdHome />,
// //   MdExplore: <MdExplore />,
// //   FaUserFriends: <FaUserFriends />,
// //   FaSave: <FaSave />,
// //   RiAddBoxFill: <RiAddBoxFill />,
// //   FaEnvelope: <FaEnvelope />,
// //   FaSearch: <FaSearch />,
// // };

// // const LeftSidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const { user } = useAuth(); // Retrieve user
// //   const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
// //   const [username, setUsername] = useState("");
// //   const [name, setName] = useState("");
// //   const [id, setId] = useState("");
  
// // const [fileName, setFileName] = useState(null);
// //   const handleSignOut = async () => {
// //     try {
// //       await signOut(); // Perform the sign-out mutation
// //       localStorage.removeItem("token"); // Remove JWT from local storage
// //       localStorage.removeItem("codeverse-user"); // Optionally remove user data if stored
// //       navigate("/sign-in"); // Redirect to sign-in page
// //       window.location.reload(); // Reload the page
// //     } catch (error) {
// //       console.error("Error signing out:", error);
// //       // Handle error display or logging as needed
// //     }
// //   };

// //   const currentUser = user && user.id ? user : INITIAL_USER;

// //   useEffect(() => {
// //     // Retrieve user data from localStorage
// //     const userJson = localStorage.getItem("user");
// //     if (userJson) {
// //       try {
// //         const user = JSON.parse(userJson);
// //         setUsername(user.username);
// //         setName(user.name);
// //         setId(user._id);
// //         setFileName(user.profilePhoto);
// //       } catch (error) {
// //         console.error("Error parsing user data:", error);
// //       }
// //     } else {
// //       console.log("No user data found in localStorage.");
// //     }
// //   }, []);
// //    const photoUrl =`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${id}%2F${fileName}?alt=media`;
// //   return (
// //     <nav className="leftsidebar h-full hidden md:flex p-5 flex-col justify-between">
// //       <div className="flex flex-col gap-11">
// //         <Link to="/" className="flex gap-3 items-center">
// //           <img
// //             src="/assets/images/codeverselogo.png"
// //             alt="CodeVerse Logo"
// //             width={90}
// //             height={30}
// //             className="rounded-md"
// //           />
// //         </Link>

// //         <Link to={`/profile/${id}`} className="flex items-center gap-3">
// //           <img
// //             src={photoUrl || "/assets/images/profile.avif"}
// //             alt="Profile"
// //             className="h-12 w-12 rounded-full"
// //           />
// //           <div className="flex flex-col">
// //             <p className="body-bold">{name}</p>
// //             <p className="small-regular text-light-3">@{username}</p>
// //           </div>
// //         </Link>

// //         <ul className="flex flex-col gap-6">
// //           {sidebarLinks.map((link) => (
// //             <li key={link.route} className="flex items-center gap-3 pl-3">
// //               {iconMapping[link.icon]}
// //               <NavLink
// //                 to={link.route}
// //                 className={({ isActive }) =>
// //                   isActive ? "text-blue-500 font-bold" : "text-gray-700"
// //                 }
// //               >
// //                 <span className="hover:text-blue-500 transition-colors duration-200">
// //                   {link.label}
// //                 </span>
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <Button
// //         variant="ghost"
// //         className="shadow-button-ghost flex text-gray-700 items-center gap-2 pr-52 hover:text-blue-500"
// //         onClick={handleSignOut}
// //       >
// //         <MdLogout size={20} className="text-white" />
// //         Logout
// //       </Button>
// //     </nav>
// //   );
// // };

// // export default LeftSidebar;
// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
// import { useAuth, INITIAL_USER } from "../../context/AuthContext";
// import { sidebarLinks } from "../../constants";
// import {
//   LayoutDashboard,
//   Search,
//   UsersRound,
//   Bookmark,
//   SquarePlus,
//   MessageCircle,
//   LogOut,
//   User,
// } from "lucide-react";
// import { Button } from "@chakra-ui/react";

// const iconMapping = {
//   LayoutDashboard: <LayoutDashboard size={22} />,
//   Search: <Search size={22} />,
//   UsersRound: <UsersRound size={22} />,
//   Bookmark: <Bookmark size={22} />,
//   SquarePlus: <SquarePlus size={22} />,
//   MessageCircle: <MessageCircle size={22} />,
// };

// const LeftSidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [id, setId] = useState("");
//   const [fileName, setFileName] = useState(null);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       localStorage.removeItem("token");
//       localStorage.removeItem("codeverse-user");
//       navigate("/sign-in");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const currentUser = user && user.id ? user : INITIAL_USER;

//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       try {
//         const user = JSON.parse(userJson);
//         setUsername(user.username);
//         setName(user.name);
//         setId(user._id);
//         setFileName(user.profilePhoto);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     } else {
//       console.log("No user data found in localStorage.");
//     }
//   }, []);

//   const photoUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${id}%2F${fileName}?alt=media`;

//   return (
//     <nav className="leftsidebar h-full hidden md:flex p-6 flex-col justify-between bg-white border-r border-gray-100 min-w-[280px]">
//       <div className="flex flex-col gap-12">
//         {/* Logo */}
//         <Link to="/" className="flex gap-3 items-center">
//           <img
//             src="/assets/images/codeverselogo.png"
//             alt="CodeVerse Logo"
//             width={110}
//             height={38}
//             className="rounded-md"
//           />
//         </Link>

//         {/* User Profile */}
//         <Link
//           to={`/profile/${id}`}
//           className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
//         >
//           <div className="flex items-center gap-3">
//             <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
//               {fileName ? (
//                 <img
//                   src={photoUrl}
//                   alt="Profile"
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <div className="h-full w-full flex items-center justify-center bg-gray-100">
//                   <User size={20} />
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-col">
//               <p className="body-bold text-gray-900 truncate max-w-[120px]">
//                 {name}
//               </p>
//               <p className="small-regular text-gray-500 truncate max-w-[120px]">
//                 @{username}
//               </p>
//             </div>
//           </div>
//         </Link>

//         {/* Navigation Links */}
//         <ul className="flex flex-col gap-1">
//           {sidebarLinks.map((link) => {
//             const isActive = pathname === link.route;
//             return (
//               <li key={link.route}>
//                 <NavLink
//                   to={link.route}
//                   className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className={isActive ? "text-blue-600" : "text-gray-700"}>
//                     {iconMapping[link.icon]}
//                   </div>
//                   <span className="font-medium">{link.label}</span>
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Logout Button */}
//       <Button
//         variant="ghost"
//         className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
//         onClick={handleSignOut}
//       >
//         <LogOut size={22} />
//         <span className="font-medium">Logout</span>
//       </Button>
//     </nav>
//   );
// };

// export default LeftSidebar;

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
import { useAuth, INITIAL_USER } from "../../context/AuthContext";
import { sidebarLinks } from "../../constants";
import {
  LayoutDashboard,
  Search,
  Users,
  Bookmark,
  SquarePlus,
  MessageCircle,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@chakra-ui/react";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: signOut, isSuccess, isError } = useSignOutAccountMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [fileName, setFileName] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("codeverse-user");
      navigate("/sign-in");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const currentUser = user && user.id ? user : INITIAL_USER;

  useEffect(() => {
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

  const photoUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${id}%2F${fileName}?alt=media`;

  // Function to render icon based on route
  const renderIcon = (route, isActive) => {
    const iconClass = isActive ? "text-blue-600" : "text-gray-400";

    switch (route) {
      case "/":
        return <LayoutDashboard size={22} className={iconClass} />;
      case "/explore":
        return <Search size={22} className={iconClass} />;
      case "/people":
        return <Users size={22} className={iconClass} />;
      case "/saved":
        return <Bookmark size={22} className={iconClass} />;
      case "/create-post":
        return <SquarePlus size={22} className={iconClass} />;
      case "/messages":
        return <MessageCircle size={22} className={iconClass} />;
      default:
        return <LayoutDashboard size={22} className={iconClass} />;
    }
  };

  return (
    <nav className="leftsidebar h-full hidden md:flex p-6 flex-col justify-between bg-[#060711] border-r border-gray-800 min-w-[280px]">
      <div className="flex flex-col gap-12">
        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/codeverselogo.png"
            alt="CodeVerse Logo"
            width={110}
            height={38}
            className="rounded-md"
          />
        </Link>

        {/* User Profile */}
        <Link
          to={`/profile/${id}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
              {fileName ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-800">
                  <User size={20} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="body-bold text-white truncate max-w-[120px]">
                {name}
              </p>
              <p className="small-regular text-gray-400 truncate max-w-[120px]">
                @{username}
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.route}>
                <NavLink
                  to={link.route}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-600 border border-blue-600/30"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {renderIcon(link.route, isActive)}
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-200"
        onClick={handleSignOut}
      >
        <LogOut size={22} />
        <span className="font-medium">Logout</span>
      </Button>
    </nav>
  );
};

export default LeftSidebar;