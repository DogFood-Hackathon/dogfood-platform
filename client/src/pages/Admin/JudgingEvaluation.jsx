import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Admin/JudgingEvaluation.css";

function JudgingEvaluation() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = {
    id: projectId,
    name: "Crowd Matcher",
    team: "Team Alpha",
    event: "HackFest 2026",
    submitted: "28 Sep 2026, 10:42 PM",
    averageScore: 91.5,
    assignedJudges: 5,
    completedJudges: 5
  };

  const evaluations = [
    {
      id: 1,
      judge: "Aman Sharma",
      email: "aman@example.com",
      status: "Submitted",
      submittedAt: "29 Sep 2026, 10:15 AM",
      scores: {
        technical: 9,
        innovation: 9,
        impact: 9,
        presentation: 10
      },
      total: 92.5,
      feedback:
        "Strong implementation with a clear problem statement and practical use case.",
      strengths:
        "Good technical execution, clean interface and effective computer vision integration.",
      improvements:
        "The project could provide more detailed documentation and deployment instructions."
    },
    {
      id: 2,
      judge: "Neha Kapoor",
      email: "neha@example.com",
      status: "Submitted",
      submittedAt: "29 Sep 2026, 11:02 AM",
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
        "Good problem understanding and functional prototype.",
      improvements:
        "The team could improve scalability and explain the architecture in more depth."
    },
    {
      id: 3,
      judge: "Rohit Verma",
      email: "rohit@example.com",
      status: "Submitted",
      submittedAt: "29 Sep 2026, 12:20 PM",
      scores: {
        technical: 10,
        innovation: 9,
        impact: 9,
        presentation: 9
      },
      total: 93.5,
      feedback:
        "A technically strong project with a useful real-world application.",
      strengths:
        "Strong implementation and clear demonstration.",
      improvements:
        "More testing evidence and edge-case handling would strengthen the project."
    },
    {
      id: 4,
      judge: "Priya Mehta",
      email: "priya@example.com",
      status: "Submitted",
      submittedAt: "29 Sep 2026, 01:05 PM",
      scores: {
        technical: 9,
        innovation: 9,
        impact: 9,
        presentation: 9
      },
      total: 90,
      feedback:
        "Well-rounded project with a clear objective and good execution.",
      strengths:
        "Balanced technical implementation and user experience.",
      improvements:
        "The presentation could explain the model limitations more clearly."
    },
    {
      id: 5,
      judge: "Karan Singh",
      email: "karan@example.com",
      status: "Submitted",
      submittedAt: "29 Sep 2026, 01:40 PM",
      scores: {
        technical: 9,
        innovation: 9,
        impact: 9,
        presentation: 9
      },
      total: 93,
      feedback:
        "A complete submission with strong implementation across the evaluation criteria.",
      strengths:
        "Strong technical depth and practical implementation.",
      improvements:
        "Could include additional performance benchmarks."
    }
  ];

  return (
    <div className="admin-judging-evaluation">
      <div className="admin-judging-evaluation-header">
        <div>
          <button
            className="admin-judging-back"
            onClick={() => navigate("/admin/judging")}
          >
            ← Back to Judging
          </button>

          <h1>{project.name}</h1>

          <p>
            {project.team} • {project.event}
          </p>
        </div>

        <div className="admin-judging-project-score">
          <span>Average Score</span>
          <strong>{project.averageScore}</strong>
          <small>/ 100</small>
        </div>
      </div>

      <div className="admin-evaluation-overview">
        <div>
          <span>Assigned Judges</span>
          <strong>{project.assignedJudges}</strong>
        </div>

        <div>
          <span>Evaluations Submitted</span>
          <strong>
            {project.completedJudges}/{project.assignedJudges}
          </strong>
        </div>

        <div>
          <span>Submission Date</span>
          <strong>{project.submitted}</strong>
        </div>

        <div>
          <span>Judging Status</span>
          <strong className="completed">
            Complete
          </strong>
        </div>
      </div>

      <div className="admin-evaluation-title">
        <div>
          <h2>Judge Evaluations</h2>
          <p>
            Individual evaluations submitted by assigned judges.
          </p>
        </div>
      </div>

      <div className="admin-evaluation-list">
        {evaluations.map((evaluation) => (
          <div
            className="admin-evaluation-card"
            key={evaluation.id}
          >
            <div className="admin-evaluation-card-header">
              <div className="admin-evaluation-judge">
                <div className="admin-evaluation-avatar">
                  {evaluation.judge.charAt(0)}
                </div>

                <div>
                  <h3>{evaluation.judge}</h3>
                  <span>{evaluation.email}</span>
                </div>
              </div>

              <div className="admin-evaluation-header-right">
                <span className="admin-evaluation-submitted">
                  ✓ {evaluation.status}
                </span>

                <div className="admin-evaluation-total">
                  <span>Total</span>
                  <strong>{evaluation.total}</strong>
                </div>
              </div>
            </div>

            <div className="admin-evaluation-scores">
              <div>
                <span>Technical</span>
                <strong>{evaluation.scores.technical}/10</strong>
              </div>

              <div>
                <span>Innovation</span>
                <strong>{evaluation.scores.innovation}/10</strong>
              </div>

              <div>
                <span>Impact</span>
                <strong>{evaluation.scores.impact}/10</strong>
              </div>

              <div>
                <span>Presentation</span>
                <strong>
                  {evaluation.scores.presentation}/10
                </strong>
              </div>
            </div>

            <div className="admin-evaluation-feedback">
              <div>
                <h4>Overall Feedback</h4>
                <p>{evaluation.feedback}</p>
              </div>

              <div>
                <h4>Strengths</h4>
                <p>{evaluation.strengths}</p>
              </div>

              <div>
                <h4>Areas for Improvement</h4>
                <p>{evaluation.improvements}</p>
              </div>
            </div>

            <div className="admin-evaluation-footer">
              <span>
                Submitted {evaluation.submittedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JudgingEvaluation;