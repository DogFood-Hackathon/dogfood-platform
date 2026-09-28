import React from "react";
import "../css/howitworks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "▣",
      title: "Create Event",
      description: "Set up your hackathon with rules and timelines.",
    },
    {
      number: "02",
      icon: "♟",
      title: "Build Team",
      description: "Participants form teams and collaborate.",
    },
    {
      number: "03",
      icon: "↑",
      title: "Submit Project",
      description: "Teams submit their projects before the deadline.",
    },
    {
      number: "04",
      icon: "♜",
      title: "Get Judged",
      description: "Experts evaluate using structured rubrics.",
    },
  ];

  return (
    <section className="dogfood-how" id="how-it-works">
      <div className="dogfood-how-heading">
        <span>HOW IT WORKS</span>
        <h2>From idea to impact in four simple steps.</h2>
      </div>

      <div className="dogfood-steps">
        <div className="dogfood-step-line"></div>

        {steps.map((step) => (
          <div className="dogfood-step" key={step.number}>
            <div className="dogfood-step-number">{step.number}</div>

            <div className="dogfood-step-content">
              <div className="dogfood-step-icon">{step.icon}</div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;