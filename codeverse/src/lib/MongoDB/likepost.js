// // import axios from "axios";

// // // Like Post
// // export const likePost = async (postId) => {
// //   try {
// //     const response = await axios.post(
// //       `http://localhost:5000/posts/${postId}/like`,
// //       {},
// //       {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(error.response?.data?.message || "Error liking post");
// //   }
// // };

// // // Unlike Post
// // export const unlikePost = async (postId) => {
// //   try {
// //     const response = await axios.post(
// //       `http://localhost:5000/posts/${postId}/unlike`,
// //       {},
// //       {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(error.response?.data?.message || "Error unliking post");
// //   }
// // };

// // // Fetch Likes Count and Likes
// // export const fetchLikesData = async (postId) => {
// //   try {
// //     const response = await axios.get(
// //       `http://localhost:5000/posts/${postId}/likes`
// //     );
// //     return response.data; // Assuming this returns { likeCount, likes }
// //   } catch (error) {
// //     throw new Error(error.response?.data?.message || "Error fetching likes");
// //   }
// // };
// import axios from "axios";

// // Like Post
// export const likePost = async (postId) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:5000/posts/${postId}/like`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Error liking post");
//   }
// };

// // Unlike Post
// export const unlikePost = async (postId) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:5000/posts/${postId}/unlike`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Error unliking post");
//   }
// };

// // Fetch Likes Count and Likes
// export const fetchLikesData = async (postId) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/posts/${postId}/likes`
//     );
//     return response.data; // Assuming this returns { likeCount, likes }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Error fetching likes");
//   }
// };
//////////////////////////
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;// Replace with your Render app's URL

// Like Post
export const likePost = async (postId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error liking post");
  }
};

// Unlike Post
export const unlikePost = async (postId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error unliking post");
  }
};

// Fetch Likes Count and Likes
export const fetchLikesData = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/likes`);
    return response.data; // Assuming this returns { likeCount, likes }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching likes");
  }
};

// Check if user has liked the post
export const checkLikeStatus = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/likes/like-status/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // Assuming response contains { liked: true/false }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error checking like status");
  }
};
