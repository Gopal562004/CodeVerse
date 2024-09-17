import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/MongoDB/Auth"; // Adjust path as needed

// Initial user state
export const INITIAL_USER = {
  id: "",
  name: "John Smith",
  email: "",
  username: "johnsmith05",
  imageUrl: "",
  bio: "",
  // Add other fields as needed
};

// Create AuthContext
const AuthContext = createContext(INITIAL_USER);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const navigate = useNavigate();

  // Function to check current user authentication status
  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser(); // Call to fetch current user
      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl, // Corrected spelling here
          bio: currentUser.bio,
          // Add other fields as needed
        });
        setIsAuthenticated(true); // Set isAuthenticated to true upon successful user retrieval
      } else {
        setIsAuthenticated(false); // Ensure isAuthenticated is false if no user found
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  useEffect(() => {
    // Check if user is authenticated on component mount
    checkAuthUser();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Check for fallback authentication state
  useEffect(() => {
    if (!localStorage.getItem('cookieFallback')) {
      navigate('/sign-in');
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  // Value object for AuthContext provider
  const value = {

    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  // Provide AuthContext value to children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext in functional components
export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Export AuthContext for use in other files
