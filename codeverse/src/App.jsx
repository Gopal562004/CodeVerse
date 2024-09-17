import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  Home,
  Explore,
  CreatePost,
  Saved,
  Profile,
  UpdateProfile,
  EditPost,
  PostDetails,
  AllUsers,
  Messages,
  LikedPost,
  Notify,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

// PrivateRoute component to handle authentication
const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/sign-in" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for token to persist login state across page reloads
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optionally clear other session storage or cookies
  };

  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout isLoggedIn={isLoggedIn} />}>
          <Route
            path="/sign-in"
            element={<SigninForm onLogin={handleLogin} />}
          />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private routes */}
        <Route
          element={
            <PrivateRoute
              element={<RootLayout onLogout={handleLogout} />}
              isLoggedIn={isLoggedIn}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notify" element={<Notify />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
