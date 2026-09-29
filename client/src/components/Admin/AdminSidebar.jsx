import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/Admin/AdminSidebar.css";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Event Approvals", path: "/admin/event-approvals" },
    { label: "Events", path: "/admin/events" },
    { label: "Participants", path: "/admin/participants" },
    { label: "Teams", path: "/admin/teams" },
    { label: "Submissions", path: "/admin/submissions" },
    { label: "Judges", path: "/admin/judges" },
    {
  label: "Judging",
  path: "/admin/judging"
},
    { label: "Results", path: "/admin/results" }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-title">
        ADMIN
      </div>

      <nav className="admin-sidebar-menu">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-link ${
                isActive ? "active" : ""
              }`}
            >
              <span className="admin-sidebar-dot"></span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <Link to="/" className="admin-sidebar-link">
          <span className="admin-sidebar-dot"></span>
          Back to Platform
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;