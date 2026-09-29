import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="about-eyebrow">ABOUT DOGFOOD</span>

        <h1>
          The platform that
          <span> judges itself.</span>
        </h1>

        <p>
          DOGFOOD is a self-hostable hackathon platform built to manage the
          complete journey from event creation and team formation to judging,
          scoring and final results.
        </p>

        <div className="about-hero-actions">
          <button onClick={() => navigate("/explore-events")}>
            Explore Hackathons
          </button>

          <button
            className="about-secondary-btn"
            onClick={() => navigate("/create-event")}
          >
            Organize a Hackathon
          </button>
        </div>
      </section>

      <section className="about-values">
        <div className="about-value-card">
          <div className="about-value-icon">◈</div>
          <h3>Self-Hostable</h3>
          <p>
            Run the complete platform locally without depending on proprietary
            cloud services.
          </p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">⚖</div>
          <h3>Fair Judging</h3>
          <p>
            Structured rubrics, judge isolation and score processing support a
            transparent judging workflow.
          </p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">⌁</div>
          <h3>Open & Flexible</h3>
          <p>
            Designed for communities, colleges, organizations and independent
            organizers.
          </p>
        </div>
      </section>

      <section className="about-flow">
        <div className="about-flow-heading">
          <span className="about-eyebrow">HOW IT WORKS</span>
          <h2>One platform. The complete hackathon lifecycle.</h2>
        </div>

        <div className="about-flow-grid">
          <div>
            <span>01</span>
            <h3>Create</h3>
            <p>Organizers create and configure their hackathon.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Build</h3>
            <p>Participants register, form teams and submit projects.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Judge</h3>
            <p>Judges evaluate assigned projects using configurable rubrics.</p>
          </div>

          <div>
            <span>04</span>
            <h3>Results</h3>
            <p>Scores are processed and final results are published.</p>
          </div>
        </div>
      </section>

      <section className="about-bottom">
        <span className="about-eyebrow">BUILT FOR HACKATHONS</span>
        <h2>From registration to results.</h2>
        <p>
          DOGFOOD brings participants, organizers, judges and administrators
          together in one workflow.
        </p>

        <button onClick={() => navigate("/explore-events")}>
          Explore the Platform
        </button>
      </section>
    </div>
  );
}

export default AboutUs;