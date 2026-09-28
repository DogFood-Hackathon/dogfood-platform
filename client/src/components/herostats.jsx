import React from "react";
import "../css/heroStats.css";

function HeroStats() {
  return (
    <div className="hero-stats">

      <div className="stat">
        <div className="stat-icon">▣</div>
        <div>
          <h3>100+</h3>
          <p>Events Hosted</p>
        </div>
      </div>

      <div className="stat">
        <div className="stat-icon">♟</div>
        <div>
          <h3>10K+</h3>
          <p>Participants</p>
        </div>
      </div>

      <div className="stat">
        <div className="stat-icon">▤</div>
        <div>
          <h3>5K+</h3>
          <p>Projects Submitted</p>
        </div>
      </div>

      <div className="stat">
        <div className="stat-icon">♜</div>
        <div>
          <h3>200+</h3>
          <p>Judges</p>
        </div>
      </div>

    </div>
  );
}

export default HeroStats;