import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  fetchPosts,
} from "../MongoDB/createpost";

// Hook to create a new post
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidate and refetch posts on success
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });
};

// Hook to update an existing post
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, post }) => updatePost({ id, post }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidate and refetch posts on success
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });
};

// Hook to delete a post
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Invalidate and refetch posts on success
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
};

// Hook to fetch posts
export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    onError: (error) => {
      console.error("Error fetching posts:", error);
    },
  });
};
