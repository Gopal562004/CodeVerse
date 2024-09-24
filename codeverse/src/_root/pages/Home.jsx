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

  if (isLoading) {
    return (
      <Flex direction="column" align="center" p={4}>
        <Text fontSize="2xl" mb={4}>
          Recent Posts
        </Text>
        <Spinner />
      </Flex>
    );
  }

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
  const allPosts = data.pages.flatMap((page) => page.posts);
  const shuffledPosts = shuffleArray(allPosts);

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="2xl" mb={4}>
        Recent Posts
      </Text>
      <Box
        id="postsContainer"
        className="scrollable-container"
        maxHeight="100vh"
        overflowY="auto"
        width="100%"
      >
        <VStack spacing={8}>
          {shuffledPosts.map((post) => (
            <PostCard key={post._id} post={post}  />
          ))}
        </VStack>
        {isFetchingNextPage && <Spinner mt={4} />}
      </Box>
    </Flex>
  );
};

export default Home;
