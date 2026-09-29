import React from "react";
import { Outlet } from "react-router-dom";
import OrganizerSidebar from "./OrganizerSidebar";
import Navbar from "../navbar";
import "../../css/Organizer/OrganizerLayout.css";

function OrganizerLayout() {
  return (
    <div className="organizer-layout">
      <Navbar/>

      <div className="organizer-layout-body">
        <OrganizerSidebar />

        <main className="organizer-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OrganizerLayout;