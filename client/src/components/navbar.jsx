import React from "react";
import "../css/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <span>◈</span> DOGFOOD
      </div>

      <div className="navbar-links">
        <a href="#events">Events</a>
        <a href="#how-it-works">How it works</a>
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        

      </div>

      <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="get-started-btn">Get Started</button>
      </div>

    </nav>
  );
}

export default Navbar;