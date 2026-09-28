import React from "react";
import "../css/herovisual.css";

function HeroVisual() {
  return (
    <div className="hero-visual">

      
      <div className="visual-glow"></div>

      <div className="floating-icon icon-users">♟</div>
      <div className="floating-icon icon-code">&lt;/&gt;</div>
      <div className="floating-icon icon-chart">▥</div>
      <div className="floating-icon icon-trophy">♜</div>


      <div className="event-card side-card left-event">

        <div className="event-card-icon">
          ✦
        </div>

        <div className="event-card-title">
          <h3>AI for Good</h3>
          <span>Ideas for a better tomorrow</span>
        </div>

        <div className="event-status upcoming">
          Upcoming
        </div>

        <div className="side-card-stats">
          <div>
            <strong>80+</strong>
            <span>Participants</span>
          </div>
        </div>

      </div>


     
      <div className="event-card main-event">

        <div className="main-event-top">

          <div className="event-card-icon main-icon">
            ◈
          </div>

          <div className="main-event-title">
            <h3>TechNova 2024</h3>
            <span>Build · Innovate · Collaborate</span>
          </div>

          <div className="event-status ongoing">
            Ongoing
          </div>

        </div>


        <div className="main-event-stats">

          <div className="main-stat">
            <div className="stat-small-icon">♟</div>

            <div>
              <strong>120+</strong>
              <span>Participants</span>
            </div>
          </div>


          <div className="main-stat">
            <div className="stat-small-icon">▣</div>

            <div>
              <strong>32</strong>
              <span>Teams</span>
            </div>
          </div>


          <div className="main-stat">
            <div className="stat-small-icon">▤</div>

            <div>
              <strong>86</strong>
              <span>Submissions</span>
            </div>
          </div>

        </div>

      </div>


     
      <div className="event-card side-card right-event">

        <div className="rightcard" style={{marginLeft:"100px"}}>

        <div className="event-card-icon">
          ◇
        </div>

        <div className="event-card-title" >
          <h3 >Web3 Unite</h3>
          <span>Build the decentralized future</span>
        </div>

        <div className="event-status completed" >
          Completed
        </div>

        <div className="side-card-stats">

          <div>
            <strong>45</strong>
            <span>Teams</span>
          </div>

          <div>
            <strong>120</strong>
            <span>Submissions</span>
          </div>

        </div>
        </div>

      </div>


    
      <div className="visual-floor-glow"></div>

    </div>
  );
}

export default HeroVisual;