// import React, { useEffect } from "react";
// import { Flex, VStack, Spinner, Box, Text } from "@chakra-ui/react";
// import PostCard from "./PostCard";
// import { useGetRecentPost } from "../../lib/react-query/queriesAndMutations";

// // Fisher-Yates shuffle algorithm
// const shuffleArray = (array) => {
//   let shuffled = array.slice();
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };
// const Home = () => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     error,
//   } = useGetRecentPost();

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollable = document.getElementById("postsContainer");
//       if (scrollable) {
//         if (
//           scrollable.scrollHeight - scrollable.scrollTop <=
//             scrollable.clientHeight + 100 &&
//           !isFetchingNextPage &&
//           hasNextPage
//         ) {
//           fetchNextPage();
//         }
//       } else {
//         console.log("Scrollable element not found");
//       }
//     };

//     const scrollable = document.getElementById("postsContainer");
//     if (scrollable) {
//       scrollable.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       if (scrollable) {
//         scrollable.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) {
//     return (
//       <Flex direction="column" align="center" p={4}>
//         <Text fontSize="2xl" mb={4}>
//           Recent Posts
//         </Text>
//         <Spinner />
//       </Flex>
//     );
//   }

//   if (error) {
//     return (
//       <Flex direction="column" align="center" p={4}>
//         <Text fontSize="2xl" mb={4}>
//           Recent Posts
//         </Text>
//         <Box>Error loading posts.</Box>
//       </Flex>
//     );
//   }

//   // Flatten and shuffle posts
//   const allPosts = data.pages.flatMap((page) => page.posts);
//   const shuffledPosts = shuffleArray(allPosts);
//   //console.log(shuffledPosts);

//   return (
//     <div className="">
//       <Flex direction="column" align="center" p={4}>
//         <Text fontSize="2xl" mb={4}>
//           Recent Posts
//         </Text>
//         <Box
//           id="postsContainer"
//           className="scrollable-container lg:pb-16"
//           maxHeight="100vh"
//           overflowY="auto"
//           width="100%"
//         >
//           <VStack spacing={8}>
//             {shuffledPosts.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </VStack>
//           {isFetchingNextPage && <Spinner mt={4} />}
//         </Box>
//       </Flex>
//     </div>
//   );
// };
// export default Home;

import React, { useEffect } from "react";
import { Flex, VStack, Spinner, Box, Text } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { useGetRecentPost } from "../../lib/react-query/queriesAndMutations";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// PostCard Skeleton Component
const PostCardSkeleton = () => {
  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-xl border border-gray-800 bg-[#0a0f1f] animate-pulse">
      {/* User Info Skeleton */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div className="ml-3 flex-grow space-y-2">
          <div className="h-4 bg-gray-700 rounded w-24"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>

      {/* Media Skeleton */}
      <div className="w-full h-64 bg-gray-700"></div>

      {/* Actions Skeleton */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-12"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetRecentPost();

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.getElementById("postsContainer");
      if (scrollable) {
        if (
          scrollable.scrollHeight - scrollable.scrollTop <=
            scrollable.clientHeight + 100 &&
          !isFetchingNextPage &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      } else {
        console.log("Scrollable element not found");
      }
    };

    const scrollable = document.getElementById("postsContainer");
    if (scrollable) {
      scrollable.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollable) {
        scrollable.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return (
      <Flex direction="column" align="center" p={4}>
        <Text fontSize="2xl" mb={4}>
          Recent Posts
        </Text>
        <Box>Error loading posts.</Box>
      </Flex>
    );
  }

  // Flatten and shuffle posts
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  const shuffledPosts = shuffleArray(allPosts);

  return (
    <div className="">
      <Flex direction="column" align="center" p={4}>
        <Text fontSize="2xl" mb={4}>
          Recent Posts
        </Text>
        <Box
          id="postsContainer"
          className="scrollable-container lg:pb-16"
          maxHeight="100vh"
          overflowY="auto"
          width="100%"
        >
          <VStack spacing={8}>
            {/* Show skeleton loading when initial loading */}
            {isLoading && !data ? (
              [...Array(3)].map((_, index) => <PostCardSkeleton key={index} />)
            ) : (
              <>
                {/* Show actual posts when loaded */}
                {shuffledPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}

                {/* Show skeleton for next page loading */}
                {isFetchingNextPage &&
                  [...Array(2)].map((_, index) => (
                    <PostCardSkeleton key={`skeleton-${index}`} />
                  ))}
              </>
            )}
          </VStack>

          {/* Show spinner at bottom when loading next page */}
          {isFetchingNextPage && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default Home;