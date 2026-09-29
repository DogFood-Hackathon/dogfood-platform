import React from "react";
import "../../css/Judge/JudgeNavbar.css";

function JudgeNavbar() {
  return (
    <nav className="judge-navbar">
      <div className="judge-navbar-logo">
        <span>◈</span>
        DOGFOOD
      </div>

      <div className="judge-navbar-center">
        <span>Judge Dashboard</span>
      </div>

      <div className="judge-navbar-actions">
        <button className="judge-notification-btn">
          ◔
        </button>

        <div className="judge-profile">
          <div className="judge-profile-avatar">
            A
          </div>

          <div className="judge-profile-info">
            <strong>Aman Sharma</strong>
            <span>Judge</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default JudgeNavbar;