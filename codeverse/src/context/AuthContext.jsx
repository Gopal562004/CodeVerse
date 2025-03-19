import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/MongoDB/Auth"; // Adjust path as needed

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  username: "",
  imageUrl: "",
  bio: "",
};

const AuthContext = createContext(INITIAL_USER);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      console.log("🔍 Checking authentication...");
      const currentUser = await getCurrentUser();
      console.log("✅ Fetched User:", currentUser);

      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl || "",
          bio: currentUser.bio || "",
        });
        localStorage.setItem("user", currentUser);
        // Store the user ID in localStorage
        localStorage.setItem("user-id", currentUser.id);

        setIsAuthenticated(true);
      } else {
        console.warn("⚠️ No authenticated user found.");
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user-id"); // Remove ID if no user is found
      }
    } catch (error) {
      console.error("❌ Error checking authentication:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user-id");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found, redirecting to login...");
      navigate("/sign-in");
    }
  }, [navigate]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
