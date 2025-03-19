import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = ({ isLoggedIn, onLogin, onLogout }) => {
  const isAuthenticated = isLoggedIn;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <video
            src="/assets/icons/printreessvideo.mp4" // Path to your video file
            autoPlay
            loop
            muted
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          >
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </>
  );
};

export default AuthLayout;
