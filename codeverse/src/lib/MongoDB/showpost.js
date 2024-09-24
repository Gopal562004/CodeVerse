// import axios from "axios";

// // showpost.js
// const fetchPosts = async ({ pageParam = 1 }) => {
//   const response = await axios.get(
//     `http://localhost:5000/posts/posts?page=${pageParam}&limit=4`
//   );
//   return response.data;
// };

// export default fetchPosts;
import axios from "axios";

// showpost.js
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:5000/posts/posts?page=${pageParam}&limit=4`
  );
  return response.data;
};

export default fetchPosts;
