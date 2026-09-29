import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Judge/JudgeEvaluationView.css";

function JudgeEvaluationView() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const evaluation = {
    project: "Dark Pattern Detector",
    team: "Code Warriors",
    event: "TechNova 2026",
    submittedAt: "29 Sep 2026, 11:20 AM",
    scores: {
      technical: 9,
      innovation: 8,
      impact: 9,
      presentation: 9
    },
    total: 88.5,
    feedback:
      "The solution addresses the intended problem effectively and demonstrates a working prototype.",
    strengths:
      "Good problem understanding, clear implementation and a functional prototype.",
    improvements:
      "The team could improve scalability and explain the architecture in more depth."
  };

  const handleEdit = () => {
    navigate(`/judge/projects/${projectId}/evaluate?edit=true`);
  };

  return (
    <div className="judge-evaluation-view">
      <div className="judge-evaluation-view-header">
        <div>
          <button
            className="judge-evaluation-back"
            onClick={() => navigate("/judge/projects")}
          >
            ← Back to Assigned Projects
          </button>

          <h1>{evaluation.project}</h1>

          <p>
            {evaluation.team} • {evaluation.event}
          </p>
        </div>

        <button
          className="judge-edit-evaluation-btn"
          onClick={handleEdit}
        >
          Edit Evaluation
        </button>
      </div>

      <div className="judge-evaluation-summary">
        <div>
          <span>Status</span>
          <strong className="submitted">Submitted</strong>
        </div>

        <div>
          <span>Submitted</span>
          <strong>{evaluation.submittedAt}</strong>
        </div>

        <div>
          <span>Overall Score</span>
          <strong className="score">
            {evaluation.total}/100
          </strong>
        </div>
      </div>

      <section className="judge-evaluation-section">
        <div className="judge-evaluation-section-header">
          <div>
            <h2>Rubric Scores</h2>
            <p>Your submitted scores for this project.</p>
          </div>
        </div>

        <div className="judge-evaluation-score-grid">
          <div className="judge-evaluation-score-card">
            <span>Technical Implementation</span>
            <strong>{evaluation.scores.technical}/10</strong>
            <div>
              <i
                style={{
                  width: `${evaluation.scores.technical * 10}%`
                }}
              ></i>
            </div>
          </div>

          <div className="judge-evaluation-score-card">
            <span>Innovation</span>
            <strong>{evaluation.scores.innovation}/10</strong>
            <div>
              <i
                style={{
                  width: `${evaluation.scores.innovation * 10}%`
                }}
              ></i>
            </div>
          </div>

          <div className="judge-evaluation-score-card">
            <span>Impact</span>
            <strong>{evaluation.scores.impact}/10</strong>
            <div>
              <i
                style={{
                  width: `${evaluation.scores.impact * 10}%`
                }}
              ></i>
            </div>
          </div>

          <div className="judge-evaluation-score-card">
            <span>Presentation</span>
            <strong>{evaluation.scores.presentation}/10</strong>
            <div>
              <i
                style={{
                  width: `${evaluation.scores.presentation * 10}%`
                }}
              ></i>
            </div>
          </div>
        </div>
      </section>

      <section className="judge-evaluation-section">
        <div className="judge-evaluation-section-header">
          <div>
            <h2>Feedback</h2>
            <p>Your submitted evaluation feedback.</p>
          </div>
        </div>

        <div className="judge-evaluation-feedback-grid">
          <div className="judge-evaluation-feedback-card">
            <h3>Overall Feedback</h3>
            <p>{evaluation.feedback}</p>
          </div>

          <div className="judge-evaluation-feedback-card">
            <h3>Strengths</h3>
            <p>{evaluation.strengths}</p>
          </div>

          <div className="judge-evaluation-feedback-card">
            <h3>Areas for Improvement</h3>
            <p>{evaluation.improvements}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JudgeEvaluationView;