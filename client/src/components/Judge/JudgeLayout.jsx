import React from "react";
import { Outlet } from "react-router-dom";
import JudgeNavbar from "./JudgeNavbar";
import JudgeSidebar from "./JudgeSidebar";
import "../../css/Judge/JudgeLayout.css";

function JudgeLayout() {
  return (
    <div className="judge-layout">
      <JudgeNavbar />

      <div className="judge-layout-body">
        <JudgeSidebar />

        <main className="judge-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default JudgeLayout;