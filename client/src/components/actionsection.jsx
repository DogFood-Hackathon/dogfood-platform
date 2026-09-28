import React from "react";
import "../css/actionsection.css";

function ActionSection() {
  return (
    <section className="action-section">
      <div className="action-content">
        <div>
          <h1>Ready to run your next hackathon?</h1>
          <p>Everything you need to go from registration to results.</p>
        </div>

        <button className="action-button">
          Create an Event <span>→</span>
        </button>
      </div>
    </section>
  );
}

export default ActionSection;