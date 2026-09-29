import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/Judge/JudgeSidebar.css";

function JudgeSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/judge"
    },
    {
      label: "Assigned Projects",
      path: "/judge/projects"
    }
  ];

  return (
    <aside className="judge-sidebar">
      <div className="judge-sidebar-title">
        JUDGE
      </div>

      <nav className="judge-sidebar-menu">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/judge"
              ? location.pathname === "/judge"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`judge-sidebar-link ${
                isActive ? "active" : ""
              }`}
            >
              <span className="judge-sidebar-dot"></span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="judge-sidebar-bottom">
        <Link
          to="/"
          className="judge-sidebar-link"
        >
          <span className="judge-sidebar-dot"></span>
          Back to Platform
        </Link>
      </div>
    </aside>
  );
}

export default JudgeSidebar;