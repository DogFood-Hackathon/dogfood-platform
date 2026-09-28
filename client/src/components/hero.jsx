import React from "react";
import "../css/hero.css";
import HeroStats from "./herostats";
import HeroVisual from "./herovisual";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
  return (
    
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          <span></span>
          Hackathon Management Platform
        </div>

        <h1>
          Run Hackathons.
          <br />
          <span>Build Real Impact.</span>
        </h1>

        <p>
          Create events, build teams, collect submissions,
          run fair evaluations, and publish results — all from
          one self-hostable platform.
        </p>

        <div className="hero-buttons">
          <button
  className="primary-btn"
  onClick={() => navigate("/explore-events")}
>
  Explore Events <span>→</span>
</button>

          <button
  className="secondary-btn"
  onClick={() => navigate("/create-event")}
>
  Create an Event
</button>
        </div>
        <HeroStats/>

      </div>

      <HeroVisual/>

    </section>
  );
}

export default Hero;