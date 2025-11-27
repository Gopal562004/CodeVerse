// // // import axios from "axios";

// // // export const CreateUserAccountMutation = async (user) => {
// // //   try {
// // //     const response = await axios.post(
// // //       "http://localhost:5000/user/sign-up",
// // //       user
// // //     );
// // //     return response.data;
// // //   } catch (error) {
// // //     throw new Error(error.response.data.message);
// // //   }
// // // };

// // // export const SignInAccountMutation = async (user) => {
// // //   try {
// // //     const response = await axios.post(
// // //       "http://localhost:5000/user/sign-in",
// // //       user
// // //     );
// // //     return response.data;
// // //   } catch (error) {
// // //     throw new Error(error.response.data.message);
// // //   }
// // // };
// // // export const SignOutAccountMutation = async () => {
// // //   try {
// // //     await axios.post("http://localhost:5000/user/sign-out");
// // //     // Optionally clear any local storage or client-side state
// // //   } catch (error) {
// // //     throw new Error(error.response.data.message);
// // //   }
// // // };
// // // export async function getCurrentUser() {
// // //   try {
// // //     const response = await axios.get("/user/current"); // Adjust endpoint as per your server setup
// // //     return response.data.user; // Assuming your server returns user data in 'user' field
// // //   } catch (error) {
// // //     console.error("Error fetching current user:", error);
// // //     throw error;
// // //   }
// // // }
// // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

// // // export const SignOutAccountMutation = async () => {
// // //   try {
// // //     await axios.post("http://localhost:5000/user/sign-out");
// // //     // Optionally clear any local storage or client-side state
// // //   } catch (error) {
// // //     throw new Error(error.response.data.message);
// // //   }
// // // };
// // export const SignOutAccountMutation = async () => {
// //   try {
// //     await axios.post("http://localhost:5000/user/sign-out");
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     return { success: true }; // Return success response explicitly
// //   } catch (error) {
// //     throw new Error(error.response?.data?.message || "Sign out failed");
// //   }
// // };


// // export const getCurrentUser = async () => {
// //   try {
// //     const response = await axios.get("/user/current"); // Adjust endpoint as per your server setup
// //     return response.data.user; // Assuming your server returns user data in 'user' field
// //   } catch (error) {
// //     console.error("Error fetching current user:", error);
// //     throw error;
// //   }
// // };
// // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import axios from "axios";

// // Use the production base URL
// const BASE_URL = import.meta.env.VITE_API_URL;
// // Create an Axios instance with the base URL
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to create a user account
// export const CreateUserAccountMutation = async (user) => {
//   try {
//     const response = await axiosInstance.post("/user/sign-up", user);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Sign up failed");
//   }
// };

// // Function to sign in a user
// export const SignInAccountMutation = async (user) => {
//   try {
//     const response = await axiosInstance.post("/user/sign-in", user);
//     //console.log(response)
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Sign in failed");
//   }
// };

// // Function to sign out a user
// export const SignOutAccountMutation = async () => {
//   try {
//     await axiosInstance.post("/user/sign-out");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     return { success: true };
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Sign out failed");
//   }
// };

// // Function to fetch the current user
// export const getCurrentUser = async () => {
//   try {
//     const response = await axiosInstance.get("/user/current");
//     return response.data.user; // Assuming your server returns user data in the 'user' field
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     throw error;
//   }
// };
// // Function to fetch user details by user ID
// export const getUserById = async (userId) => {
//   try {
//     const response = await axiosInstance.get(`/user/${userId}`);
//     return response.data.user; // Assuming your server returns user data in the 'user' field
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch user data");
//   }
// };


import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance with better configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for session-based auth
  timeout: 10000,
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      `🔄 Making ${config.method?.toUpperCase()} request to:`,
      config.url
    );
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("🚨 Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("🚨 Response error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Enhanced authentication functions
export const CreateUserAccountMutation = async (user) => {
  try {
    console.log("📝 Attempting user registration:", {
      username: user.username,
      email: user.email,
    });

    const response = await axiosInstance.post("/user/sign-up", user);
    console.log("✅ Registration successful:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Sign up failed";
    console.error("🚨 Registration failed:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const SignInAccountMutation = async (credentials) => {
  try {
    console.log("🔐 Attempting sign-in:", {
      username: credentials.username,
      // Don't log password
    });

    const response = await axiosInstance.post("/user/sign-in", credentials);
    console.log("✅ Sign-in successful:", response.data);

    // Store token if provided
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("🔑 Token stored successfully");
    }

    // Store user data if provided
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("👤 User data stored successfully");
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Sign in failed";
    console.error("🚨 Sign-in failed:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Clear any existing auth data on failure
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    throw new Error(errorMessage);
  }
};

export const SignOutAccountMutation = async () => {
  try {
    console.log("🚪 Attempting sign-out");
    const response = await axiosInstance.post("/user/sign-out");

    // Always clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("✅ Sign-out successful");
    return { success: true };
  } catch (error) {
    console.error("🚨 Sign-out error:", error);

    // Still clear local storage even if server request fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    throw new Error(error.response?.data?.message || "Sign out failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("🔐 No token found, user not authenticated");
      throw new Error("No authentication token found");
    }

    console.log("👤 Fetching current user with token");
    const response = await axiosInstance.get("/user/current");
    console.log("✅ Current user fetched:", response.data);
    return response.data.user;
  } catch (error) {
    console.error("🚨 Error fetching current user:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    // Clear invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    console.log(`👥 Fetching user by ID: ${userId}`);
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("🚨 Error fetching user by ID:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};