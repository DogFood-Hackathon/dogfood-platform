import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Judge/judgeDashboard.css";

function JudgeDashboard() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Crowd Matcher",
      team: "Team Alpha",
      event: "HackFest 2026",
      submitted: "28 Sep 2026, 10:42 PM",
      status: "Pending Evaluation"
    },
    {
      id: 2,
      name: "Dark Pattern Detector",
      team: "Code Warriors",
      event: "TechNova 2026",
      submitted: "28 Sep 2026, 08:15 PM",
      status: "Completed"
    },
    {
      id: 3,
      name: "HealthAssist",
      team: "Neural Minds",
      event: "AI for Good",
      submitted: "27 Sep 2026, 11:30 PM",
      status: "Pending Evaluation"
    },
    {
      id: 4,
      name: "Web3 Vault",
      team: "Pixel Coders",
      event: "TechNova 2026",
      submitted: "27 Sep 2026, 07:48 PM",
      status: "Completed"
    },
    {
      id: 5,
      name: "EcoTrack",
      team: "Solo Builders",
      event: "HackFest 2026",
      submitted: "26 Sep 2026, 06:20 PM",
      status: "Pending Evaluation"
    }
  ];

  const totalAssigned = projects.length;

  const pendingEvaluations = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.status === "Pending Evaluation"
      ).length,
    [projects]
  );

  const completedEvaluations = useMemo(
    () =>
      projects.filter(
        (project) => project.status === "Completed"
      ).length,
    [projects]
  );

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, 3);

  const handleProjectAction = (project) => {
    if (project.status === "Completed") {
      navigate(
        `/judge/projects/${project.id}/evaluation`
      );
      return;
    }

    navigate(
      `/judge/projects/${project.id}/evaluate`
    );
  };

  return (
    <div className="judge-dashboard">
      <div className="judge-dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Review and evaluate your assigned projects.
          </p>
        </div>

        <button
          className="judge-dashboard-projects-btn"
          onClick={() => navigate("/judge/projects")}
        >
          View All Projects
        </button>
      </div>

      <div className="judge-stats-grid">
        <div className="judge-stat-card">
          <div className="judge-stat-icon">◈</div>

          <div>
            <span>Total Assigned</span>
            <strong>{totalAssigned}</strong>
            <small>Projects assigned to you</small>
          </div>
        </div>

        <div className="judge-stat-card">
          <div className="judge-stat-icon">◷</div>

          <div>
            <span>Pending Evaluation</span>
            <strong>{pendingEvaluations}</strong>
            <small>Awaiting your review</small>
          </div>
        </div>

        <div className="judge-stat-card">
          <div className="judge-stat-icon">✓</div>

          <div>
            <span>Completed</span>
            <strong>{completedEvaluations}</strong>
            <small>Evaluations submitted</small>
          </div>
        </div>

        <div className="judge-stat-card">
          <div className="judge-stat-icon">%</div>

          <div>
            <span>Completion Rate</span>
            <strong>
              {totalAssigned
                ? Math.round(
                    (completedEvaluations /
                      totalAssigned) *
                      100
                  )
                : 0}
              %
            </strong>
            <small>Your judging progress</small>
          </div>
        </div>
      </div>

      <section className="judge-projects-section">
        <div className="judge-section-header">
          <div>
            <h2>Assigned Projects</h2>
            <p>
              Projects currently assigned to you for
              evaluation.
            </p>
          </div>

          <button
            className="judge-view-all-btn"
            onClick={() =>
              setShowAll((previous) => !previous)
            }
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="judge-projects-list">
          {visibleProjects.map((project) => (
            <div
              className="judge-project-card"
              key={project.id}
            >
              <div className="judge-project-main">
                <div className="judge-project-icon">
                  ◈
                </div>

                <div>
                  <h3>{project.name}</h3>

                  <div className="judge-project-meta">
                    <span>{project.team}</span>
                    <span>•</span>
                    <span>{project.event}</span>
                  </div>

                  <span className="judge-project-submitted">
                    Submitted {project.submitted}
                  </span>
                </div>
              </div>

              <div className="judge-project-right">
                <span
                  className={`judge-project-status ${
                    project.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {project.status}
                </span>

                <button
                  className="judge-project-action"
                  onClick={() =>
                    handleProjectAction(project)
                  }
                >
                  {project.status === "Completed"
                    ? "View Evaluation"
                    : "Evaluate"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAll && (
          <button
            className="judge-full-projects-btn"
            onClick={() =>
              navigate("/judge/projects")
            }
          >
            Open Assigned Projects
          </button>
        )}
      </section>
    </div>
  );
}

export default JudgeDashboard;