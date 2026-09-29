import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../../css/Judge/JudgeEvaluation.css";

function JudgeEvaluation() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get("edit") === "true";

  const project = {
    id: projectId,
    name: "Crowd Matcher",
    team: "Team Alpha",
    event: "HackFest 2026",
    description:
      "A computer vision based platform that helps identify and match crowd members using facial attributes.",
    techStack: ["React", "Python", "OpenCV", "Flask"],
    repository: "github.com/team-alpha/crowd-matcher",
    demo: "crowd-matcher.demo",
    submitted: "28 Sep 2026, 10:42 PM"
  };

  const existingEvaluation = {
    technical: "9",
    innovation: "8",
    impact: "9",
    presentation: "9",
    feedback:
      "The solution addresses the intended problem effectively and demonstrates a working prototype.",
    strengths:
      "Good problem understanding, clear implementation and a functional prototype.",
    improvements:
      "The team could improve scalability and explain the architecture in more depth."
  };

  const [scores, setScores] = useState(
    isEditMode
      ? {
          technical: existingEvaluation.technical,
          innovation: existingEvaluation.innovation,
          impact: existingEvaluation.impact,
          presentation: existingEvaluation.presentation
        }
      : {
          technical: "",
          innovation: "",
          impact: "",
          presentation: ""
        }
  );

  const [feedback, setFeedback] = useState(
    isEditMode ? existingEvaluation.feedback : ""
  );

  const [strengths, setStrengths] = useState(
    isEditMode ? existingEvaluation.strengths : ""
  );

  const [improvements, setImprovements] = useState(
    isEditMode ? existingEvaluation.improvements : ""
  );

  const totalScore = useMemo(() => {
    if (
      !scores.technical ||
      !scores.innovation ||
      !scores.impact ||
      !scores.presentation
    ) {
      return "—";
    }

    return (
      (Number(scores.technical) * 40 +
        Number(scores.innovation) * 25 +
        Number(scores.impact) * 20 +
        Number(scores.presentation) * 15) /
      10
    ).toFixed(1);
  }, [scores]);

  const handleScoreChange = (field, value) => {
    if (value === "") {
      setScores((previous) => ({
        ...previous,
        [field]: ""
      }));
      return;
    }

    const numericValue = Number(value);

    if (numericValue < 0 || numericValue > 10) {
      return;
    }

    setScores((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allScoresFilled = Object.values(scores).every(
      (value) => value !== ""
    );

    if (!allScoresFilled) {
      alert("Please provide scores for all criteria.");
      return;
    }

    if (!feedback.trim()) {
      alert("Please provide overall feedback.");
      return;
    }

    if (!strengths.trim()) {
      alert("Please provide project strengths.");
      return;
    }

    if (!improvements.trim()) {
      alert("Please provide areas for improvement.");
      return;
    }

    const evaluationPayload = {
      projectId,
      scores,
      totalScore,
      feedback,
      strengths,
      improvements,
      updatedAt: new Date().toISOString()
    };

    console.log("EVALUATION PAYLOAD:");
    console.log(evaluationPayload);

    alert(
      isEditMode
        ? "Evaluation updated successfully."
        : "Evaluation submitted successfully."
    );

    navigate(
      `/judge/projects/${projectId}/evaluation`
    );
  };

  return (
    <div className="judge-evaluation">
      <div className="judge-evaluation-header">
        <div>
          <button
            className="judge-evaluation-back"
            onClick={() =>
              navigate("/judge/projects")
            }
          >
            ← Back to Assigned Projects
          </button>

          <h1>
            {isEditMode
              ? "Edit Evaluation"
              : "Evaluate Project"}
          </h1>

          <p>
            {isEditMode
              ? "Update your submitted evaluation."
              : "Review the project and submit your evaluation."}
          </p>
        </div>

        <div className="judge-evaluation-score">
          <span>Overall Score</span>
          <strong>{totalScore}</strong>
          <small>/ 100</small>
        </div>
      </div>

      <section className="judge-project-overview">
        <div className="judge-project-overview-header">
          <div>
            <h2>{project.name}</h2>
            <p>
              {project.team} • {project.event}
            </p>
          </div>

          <span className="judge-project-submitted">
            Submitted {project.submitted}
          </span>
        </div>

        <p className="judge-project-description">
          {project.description}
        </p>

        <div className="judge-project-details">
          <div>
            <span>Tech Stack</span>

            <div className="judge-tech-stack">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div>
            <span>Repository</span>
            <a href={`https://${project.repository}`} target="_blank" rel="noreferrer">
              {project.repository}
            </a>
          </div>

          <div>
            <span>Demo</span>
            <a href={`https://${project.demo}`} target="_blank" rel="noreferrer">
              {project.demo}
            </a>
          </div>
        </div>
      </section>

      <form
        className="judge-evaluation-form"
        onSubmit={handleSubmit}
      >
        <section className="judge-evaluation-section">
          <div className="judge-evaluation-section-header">
            <div>
              <h2>Evaluation Rubric</h2>
              <p>
                Score each criterion from 0 to 10.
              </p>
            </div>
          </div>

          <div className="judge-rubric-list">
            <div className="judge-rubric-row">
              <div>
                <h3>Technical Implementation</h3>
                <p>
                  Quality, functionality and technical execution.
                </p>
                <span>Weight: 40%</span>
              </div>

              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={scores.technical}
                onChange={(event) =>
                  handleScoreChange(
                    "technical",
                    event.target.value
                  )
                }
                placeholder="0–10"
              />
            </div>

            <div className="judge-rubric-row">
              <div>
                <h3>Innovation</h3>
                <p>
                  Originality and creativity of the solution.
                </p>
                <span>Weight: 25%</span>
              </div>

              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={scores.innovation}
                onChange={(event) =>
                  handleScoreChange(
                    "innovation",
                    event.target.value
                  )
                }
                placeholder="0–10"
              />
            </div>

            <div className="judge-rubric-row">
              <div>
                <h3>Impact</h3>
                <p>
                  Relevance, usefulness and potential impact.
                </p>
                <span>Weight: 20%</span>
              </div>

              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={scores.impact}
                onChange={(event) =>
                  handleScoreChange(
                    "impact",
                    event.target.value
                  )
                }
                placeholder="0–10"
              />
            </div>

            <div className="judge-rubric-row">
              <div>
                <h3>Presentation</h3>
                <p>
                  Clarity, demonstration and communication.
                </p>
                <span>Weight: 15%</span>
              </div>

              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={scores.presentation}
                onChange={(event) =>
                  handleScoreChange(
                    "presentation",
                    event.target.value
                  )
                }
                placeholder="0–10"
              />
            </div>
          </div>
        </section>

        <section className="judge-evaluation-section">
          <div className="judge-evaluation-section-header">
            <div>
              <h2>Evaluation Feedback</h2>
              <p>
                Provide detailed feedback for the project team.
              </p>
            </div>
          </div>

          <div className="judge-feedback-fields">
            <label>
              Overall Feedback

              <textarea
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                placeholder="Write your overall evaluation..."
                rows="5"
              />
            </label>

            <label>
              Strengths

              <textarea
                value={strengths}
                onChange={(event) =>
                  setStrengths(event.target.value)
                }
                placeholder="What did the team do well?"
                rows="4"
              />
            </label>

            <label>
              Areas for Improvement

              <textarea
                value={improvements}
                onChange={(event) =>
                  setImprovements(event.target.value)
                }
                placeholder="What could be improved?"
                rows="4"
              />
            </label>
          </div>
        </section>

        <div className="judge-evaluation-actions">
          <button
            type="button"
            className="judge-save-draft-btn"
            onClick={() => alert("Evaluation saved as draft.")}
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="judge-submit-evaluation-btn"
          >
            {isEditMode
              ? "Update & Resubmit"
              : "Submit Evaluation"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JudgeEvaluation;