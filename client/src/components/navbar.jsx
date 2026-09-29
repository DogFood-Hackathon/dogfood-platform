import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>◈</span> DOGFOOD
      </div>

      <div className="navbar-links">
        <Link to="/explore-events">Events</Link>
        <a href="#how-it-works">How it works</a>
        <a href="#about">About</a>
      </div>

      <div className="navbar-actions">
        <button className="login-btn">Login</button>

        <button className="get-started-btn">
          Get Started
        </button>

        <div
          className="navbar-profile-wrapper"
          ref={profileRef}
        >
          <button
            className="navbar-profile-btn"
            onClick={() => setProfileOpen((previous) => !previous)}
            aria-label="Profile"
          >
            👤
          </button>

          <div className="profile-tooltip">
            Profile
          </div>

          {profileOpen && (
            <div className="profile-dropdown">
              <Link
                to="/profile"
                onClick={() => setProfileOpen(false)}
              >
                <span>👤</span>
                My Profile
              </Link>

              <Link
  to="/organizer"
  onClick={() => setProfileOpen(false)}
>
  <span>📊</span>
  Organizer Dashboard
</Link>

              <Link
                to="/my-submissions"
                onClick={() => setProfileOpen(false)}
              >
                <span>🚀</span>
                My Submissions
              </Link>

              <Link
                to="/create-event"
                onClick={() => setProfileOpen(false)}
              >
                <span>🏆</span>
                Create Hackathon
              </Link>

              <div className="profile-dropdown-divider"></div>

              <button className="profile-logout">
                <span>↪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;