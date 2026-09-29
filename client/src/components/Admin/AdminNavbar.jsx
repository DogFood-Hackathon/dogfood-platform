import React from "react";
import "../../css/Admin/AdminNavbar.css";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">
        <span>◈</span>
        DOGFOOD
      </div>

      <div className="admin-navbar-center">
        <span>Admin Panel</span>
      </div>

      <div className="admin-navbar-actions">
        <button className="admin-notification-btn">
          ◔
        </button>

        <div className="admin-profile">
          <div className="admin-profile-avatar">A</div>

          <div className="admin-profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;