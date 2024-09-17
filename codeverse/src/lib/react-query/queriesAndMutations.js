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
import fetchPosts from "../MongoDB/showpost"; // Adjust the path as needed

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
export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: () => SignOutAccountMutation(),
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
