import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost, fetchLikesData } from "../MongoDB/likepost";

// Like Post Mutation
export const useLikePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error liking post:", error);
    },
  });
};

// Unlike Post Mutation
export const useUnlikePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error unliking post:", error);
    },
  });
};

// Fetch Likes Data Query
export const useLikesDataQuery = (postId) => {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn: async () => {
      const response = await axios.get(`/api/likes/${postId}`);
      return response.data;
    },
    enabled: !!postId, // Ensure postId is available
  });
};