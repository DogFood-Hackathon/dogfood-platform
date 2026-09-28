import React from "react";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate=useNavigate();
  return (
    <nav className="navbar">

      <div className="navbar-logo" onClick={()=>navigate("/")}>
        <span>
        <span>◈</span> DOGFOOD
         </span>
        
      </div>

      <div className="navbar-links">
        <a href="#events" onClick={()=>navigate("/explore-events")}>Events</a>
        <a href="#how-it-works" >How it works</a>
        <a href="#about" onClick={()=>navigate("/")}>About</a>
        <a href="#gallery" >Gallery</a>
        

      </div>

      <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="get-started-btn">Get Started</button>
      </div>

    </nav>
  );
}

export default Navbar;