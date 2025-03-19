import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  CreateUserAccountMutation,
  SignInAccountMutation,
  SignOutAccountMutation,
} from "../MongoDB/Auth";
import {fetchPosts,fetchPostsExplore} from "../MongoDB/showpost"; // Adjust the path as needed

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => CreateUserAccountMutation(user),
  });
};
export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => SignInAccountMutation(user),
  });
};
// export const useSignOutAccountMutation = () => {
//   return useMutation({
//     mutationFn: () => SignOutAccountMutation(),
//   });
// };
// export const useSignOutAccountMutation = () => {
//   return useMutation({
//     mutationFn: SignOutAccountMutation,
//   });
// };
export const useSignOutAccountMutation = (onSuccessCallback) => {
  return useMutation({
    mutationFn: SignOutAccountMutation,
    onSuccess: () => {
      // Remove local storage items upon successful sign-out
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      onSuccessCallback(); // Execute callback to handle navigation
    },
    onError: (error) => {
      console.error("Sign-out error:", error);
      // Handle any additional error logging if needed
    },
  });
};

// export async function getCurrentUser() {
//   try {
//     const response = await axios.get("/user/current");
//     return response.data.user;
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     throw error;
//   }
// }
export const useGetRecentPost = () => {
  return useInfiniteQuery({
    queryKey: ["recentPosts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
};

export const useGetPostsExplore = () => {
  return useInfiniteQuery({
    queryKey: ["posts-explore"], // Unique query key
    queryFn: ({ pageParam = 1 }) => fetchPostsExplore(pageParam), // Pass pageParam
    initialPageParam: 1, // Start from page 1
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    keepPreviousData: true,
  });
};


