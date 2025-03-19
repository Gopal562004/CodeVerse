// // import axios from "axios";

// // export const CreateUserAccountMutation = async (user) => {
// //   try {
// //     const response = await axios.post(
// //       "http://localhost:5000/user/sign-up",
// //       user
// //     );
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(error.response.data.message);
// //   }
// // };

// // export const SignInAccountMutation = async (user) => {
// //   try {
// //     const response = await axios.post(
// //       "http://localhost:5000/user/sign-in",
// //       user
// //     );
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(error.response.data.message);
// //   }
// // };
// // export const SignOutAccountMutation = async () => {
// //   try {
// //     await axios.post("http://localhost:5000/user/sign-out");
// //     // Optionally clear any local storage or client-side state
// //   } catch (error) {
// //     throw new Error(error.response.data.message);
// //   }
// // };
// // export async function getCurrentUser() {
// //   try {
// //     const response = await axios.get("/user/current"); // Adjust endpoint as per your server setup
// //     return response.data.user; // Assuming your server returns user data in 'user' field
// //   } catch (error) {
// //     console.error("Error fetching current user:", error);
// //     throw error;
// //   }
// // }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import axios from "axios";

// export const CreateUserAccountMutation = async (user) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/user/sign-up",
//       user
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// };

// export const SignInAccountMutation = async (user) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/user/sign-in",
//       user
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// };

// // export const SignOutAccountMutation = async () => {
// //   try {
// //     await axios.post("http://localhost:5000/user/sign-out");
// //     // Optionally clear any local storage or client-side state
// //   } catch (error) {
// //     throw new Error(error.response.data.message);
// //   }
// // };
// export const SignOutAccountMutation = async () => {
//   try {
//     await axios.post("http://localhost:5000/user/sign-out");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     return { success: true }; // Return success response explicitly
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Sign out failed");
//   }
// };


// export const getCurrentUser = async () => {
//   try {
//     const response = await axios.get("/user/current"); // Adjust endpoint as per your server setup
//     return response.data.user; // Assuming your server returns user data in 'user' field
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     throw error;
//   }
// };
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// Use the production base URL
const BASE_URL = import.meta.env.VITE_API_URL;
// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create a user account
export const CreateUserAccountMutation = async (user) => {
  try {
    const response = await axiosInstance.post("/user/sign-up", user);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

// Function to sign in a user
export const SignInAccountMutation = async (user) => {
  try {
    const response = await axiosInstance.post("/user/sign-in", user);
    //console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sign in failed");
  }
};

// Function to sign out a user
export const SignOutAccountMutation = async () => {
  try {
    await axiosInstance.post("/user/sign-out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sign out failed");
  }
};

// Function to fetch the current user
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/user/current");
    return response.data.user; // Assuming your server returns user data in the 'user' field
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
// Function to fetch user details by user ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user; // Assuming your server returns user data in the 'user' field
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};
