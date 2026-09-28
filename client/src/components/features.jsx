import React from "react";
import "../css/features.css";

function Features() {
  const features = [
    {
      icon: "▣",
      title: "Event Management",
      description:
        "Create and configure hackathons with custom rules, tracks and timelines.",
    },
    {
      icon: "♟",
      title: "Team Formation",
      description:
        "Let participants find teammates and collaborate easily.",
    },
    {
      icon: "▤",
      title: "Submissions",
      description:
        "Collect project submissions with draft support and file uploads.",
    },
    {
      icon: "⚖",
      title: "Fair Judging",
      description:
        "Structured evaluations with weighted rubrics and conflict-free assignments.",
    },
    {
      icon: "▥",
      title: "Results & Analytics",
      description:
        "Normalize scores, generate rankings and publish results automatically.",
    },
    {
      icon: "◇",
      title: "Built for Trust",
      description:
        "Role isolation, audit trails and anti-abuse mechanisms to ensure fairness.",
    },
  ];

  return (
    <section className="features-section" id="features">

      <div className="features-heading">
        <span className="section-label">FEATURES</span>

        <h2>
          Everything you need for a successful hackathon.
        </h2>

        <p>
          Simple tools. A smooth experience. Real impact.
        </p>
      </div>


      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Features;