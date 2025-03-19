import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem("token");

const followService = {
  // Follow a user
  followUser: async (userId) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.post(
        `${API_BASE_URL}/users/${userId}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Unfollow a user
  unfollowUser: async (userId) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.post(
        `${API_BASE_URL}/users/${userId}/unfollow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error unfollowing user:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Get followers of a user
  getFollowers: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/followers`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching followers:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Get users a user is following
  getFollowing: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/following`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching following:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Get follow count (followers & following)
  getFollowCount: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/follow-count`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching follow count:",
        error.response?.data || error
      );
      throw error.response?.data || error;
    }
  },

  // Check if the authenticated user follows a specific user
  isFollowingUser: async (userId) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/follow-status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error checking follow status:",
        error.response?.data || error
      );
      throw error.response?.data || error;
    }
  },
};

export default followService;
