// import React from "react";

// const suggestions = [
//   {
//     name: "माझी Mumbai, आपली B",
//     username: "@mybmc",
//     avatar: "path/to/avatar1.jpg", // replace with the actual path
//     verified: true,
//   },
//   {
//     name: "Prafull Billore",
//     username: "@pbillore141",
//     avatar: "path/to/avatar2.jpg", // replace with the actual path
//     verified: false,
//   },
//   {
//     name: "Microsoft",
//     username: "@Microsoft",
//     avatar: "path/to/avatar3.jpg", // replace with the actual path
//     verified: true,
//   },
// ];

// const AccountSuggestion = () => {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
//       {suggestions.map((suggestion, index) => (
//         <div key={index} className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <img
//               src={suggestion.avatar}
//               alt={suggestion.name}
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <div className="flex items-center">
//                 <span>{suggestion.name}</span>
//                 {suggestion.verified && (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 ml-1 text-blue-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 11.75L11 14l4-4.5"
//                     />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-gray-500">{suggestion.username}</span>
//             </div>
//           </div>
//           <button className="bg-blue-600 text-white px-3 py-1 rounded-full">
//             Follow
//           </button>
//         </div>
//       ))}
//       <button className="text-blue-500 mt-2">Show more</button>
//     </div>
//   );
// };

// export default AccountSuggestion;


import React from "react";
import { User, UserPlus, Check, MoreHorizontal } from "lucide-react";

const suggestions = [
  {
    name: "माझी Mumbai, आपली BMC",
    username: "mybmc",
    avatar: "path/to/avatar1.jpg",
    verified: true,
  },
  {
    name: "Prafull Billore",
    username: "pbillore141",
    avatar: "path/to/avatar2.jpg",
    verified: false,
  },
  {
    name: "Microsoft",
    username: "Microsoft",
    avatar: "path/to/avatar3.jpg",
    verified: true,
  },
];

const AccountSuggestion = () => {
  return (
    <div className="bg-[#0a0f1f] rounded-xl p-4 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Who to follow</h2>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-grow min-w-0">
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                {suggestion.avatar ? (
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-white font-medium text-sm truncate">
                    {suggestion.name}
                  </span>
                  {suggestion.verified && (
                    <Check size={14} className="text-blue-600 flex-shrink-0" />
                  )}
                </div>
                <span className="text-gray-400 text-sm truncate">
                  @{suggestion.username}
                </span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 ml-2">
              Follow
            </button>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 hover:text-blue-500 transition-colors text-sm font-medium flex items-center justify-center gap-1">
        <MoreHorizontal size={16} />
        Show more
      </button>
    </div>
  );
};

export default AccountSuggestion;