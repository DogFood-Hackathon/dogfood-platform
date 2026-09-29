import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/Organizer/OrganizerSidebar.css";

function OrganizerSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/organizer"
    },
    {
      label: "Hackathons",
      path: "/organizer/hackathons"
    },
    {
      label: "Participants",
      path: "/organizer/participants"
    },
    {
      label: "Teams",
      path: "/organizer/teams"
    },
    {
      label: "Submissions",
      path: "/organizer/submissions"
    },
    {
      label: "Judges",
      path: "/organizer/judges"
    },
    {
      label: "Rubric",
      path: "/organizer/rubric"
    },
    {
      label: "Judging",
      path: "/organizer/judging"
    },
    {
      label: "Results",
      path: "/organizer/results"
    }
  ];

  const isActive = (path) => {
    if (path === "/organizer") {
      return location.pathname === "/organizer";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="organizer-sidebar">
      <div className="organizer-sidebar-header">
        <span className="organizer-sidebar-label">
          ORGANIZER
        </span>
      </div>

      <nav className="organizer-sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`organizer-sidebar-link ${
              isActive(item.path) ? "active" : ""
            }`}
          >
            <span className="organizer-sidebar-dot"></span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="organizer-sidebar-bottom">
        <Link
          to="/create-event"
          className="organizer-sidebar-create"
        >
          <span>+</span>
          Create Hackathon
        </Link>

        <Link
          to="/"
          className="organizer-sidebar-link organizer-back-link"
        >
          <span className="organizer-sidebar-dot"></span>
          Back to Platform
        </Link>
      </div>
    </aside>
  );
}

export default OrganizerSidebar;