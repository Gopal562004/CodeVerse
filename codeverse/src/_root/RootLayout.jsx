import React from "react";
import LeftSidebar from "../components/shared/LeftSidebar";
import Bottombar from "../components/shared/Bottombar";
import { Outlet } from "react-router-dom";
import Topbar from "../components/shared/TOpbar";
import ExtraSection from "../components/shared/ExtraSection";
const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* Topbar (always visible) */}
      <Topbar />

      {/* LeftSidebar (20% width on desktop) */}
      <div className="md:w-1/4 hidden md:block">
        <LeftSidebar />
      </div>

      {/* Outlet (80% width on desktop) */}
      <section className="md:w-1/2 w-full">
        <Outlet />
      </section>

      {/* Bottombar (hidden on desktop) */}
      <Bottombar />
      <div className="md:w-1/4 hidden md:block">
        <ExtraSection />
      </div>
    </div>
  );
};

export default RootLayout;
