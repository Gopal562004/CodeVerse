// // import axios from "axios";

// // // showpost.js
// // const fetchPosts = async ({ pageParam = 1 }) => {
// //   const response = await axios.get(
// //     `http://localhost:5000/posts/posts?page=${pageParam}&limit=4`
// //   );
// //   return response.data;
// // };

// // export default fetchPosts;
// import axios from "axios";

// // showpost.js
// const fetchPosts = async ({ pageParam = 1 }) => {
//   const response = await axios.get(
//     `http://localhost:5000/posts/posts?page=${pageParam}&limit=4`
//   );
//   return response.data;
// };

// export default fetchPosts;
////////
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;// Replace with your Render app's URL

// showpost.js
export const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `${BASE_URL}/posts/posts?page=${pageParam}&limit=4`
  );
  return response.data;
};

export const fetchPostsExplore = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `${BASE_URL}/posts/explore-posts?page=${pageParam}&limit=10`
  );
  return response.data;
};


