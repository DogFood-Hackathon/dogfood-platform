import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Admin/Judging.css";

function Judging() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [projects] = useState([
    {
      id: 1,
      project: "Crowd Matcher",
      team: "Team Alpha",
      event: "HackFest 2026",
      assignedJudges: 5,
      completedJudges: 5,
      averageScore: 91.5,
      status: "Complete"
    },
    {
      id: 2,
      project: "Dark Pattern Detector",
      team: "Code Warriors",
      event: "TechNova 2026",
      assignedJudges: 5,
      completedJudges: 5,
      averageScore: 88.7,
      status: "Complete"
    },
    {
      id: 3,
      project: "HealthAssist",
      team: "Neural Minds",
      event: "AI for Good",
      assignedJudges: 5,
      completedJudges: 4,
      averageScore: 86.2,
      status: "In Progress"
    },
    {
      id: 4,
      project: "Web3 Vault",
      team: "Pixel Coders",
      event: "TechNova 2026",
      assignedJudges: 5,
      completedJudges: 5,
      averageScore: 82.9,
      status: "Complete"
    },
    {
      id: 5,
      project: "EcoTrack",
      team: "Solo Builders",
      event: "HackFest 2026",
      assignedJudges: 5,
      completedJudges: 3,
      averageScore: 78.4,
      status: "In Progress"
    }
  ]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.project
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.team
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.event
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const totalEvaluations = projects.reduce(
    (total, project) => total + project.completedJudges,
    0
  );

  const totalExpected = projects.reduce(
    (total, project) => total + project.assignedJudges,
    0
  );

  const completedProjects = projects.filter(
    (project) => project.status === "Complete"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  return (
    <div className="admin-judging">
      <div className="admin-judging-header">
        <div>
          <h1>Judging</h1>
          <p>
            Monitor judge evaluations and judging progress.
          </p>
        </div>
      </div>

      <div className="admin-judging-stats">
        <div className="admin-judging-stat">
          <span>Total Evaluations</span>
          <strong>
            {totalEvaluations}/{totalExpected}
          </strong>
          <small>Submitted evaluations</small>
        </div>

        <div className="admin-judging-stat">
          <span>Completed Projects</span>
          <strong>{completedProjects}</strong>
          <small>All assigned judges completed</small>
        </div>

        <div className="admin-judging-stat">
          <span>In Progress</span>
          <strong>{inProgressProjects}</strong>
          <small>Awaiting evaluations</small>
        </div>

        <div className="admin-judging-stat">
          <span>Overall Progress</span>
          <strong>
            {Math.round(
              (totalEvaluations / totalExpected) * 100
            )}%
          </strong>
          <small>Judging completion</small>
        </div>
      </div>

      <div className="admin-judging-toolbar">
        <div className="admin-judging-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search projects, teams or events..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Complete">Complete</option>
          <option value="In Progress">
            In Progress
          </option>
        </select>
      </div>

      <div className="admin-judging-list">
        {filteredProjects.map((project) => {
          const progress = Math.round(
            (project.completedJudges /
              project.assignedJudges) *
              100
          );

          return (
            <div
              className="admin-judging-card"
              key={project.id}
            >
              <div className="admin-judging-project">
                <div className="admin-judging-icon">
                  ◈
                </div>

                <div>
                  <h2>{project.project}</h2>

                  <div className="admin-judging-meta">
                    <span>{project.team}</span>
                    <span>•</span>
                    <span>{project.event}</span>
                  </div>
                </div>
              </div>

              <div className="admin-judging-progress">
                <div className="admin-judging-progress-top">
                  <span>Judging Progress</span>
                  <strong>
                    {project.completedJudges}/
                    {project.assignedJudges}
                  </strong>
                </div>

                <div className="admin-judging-progress-bar">
                  <div
                    style={{
                      width: `${progress}%`
                    }}
                  ></div>
                </div>

                <span className="admin-judging-progress-text">
                  {progress}% completed
                </span>
              </div>

              <div className="admin-judging-score">
                <span>Average Score</span>
                <strong>
                  {project.averageScore}
                </strong>
                <small>/ 100</small>
              </div>

              <div className="admin-judging-actions">
                <span
                  className={`admin-judging-status ${
                    project.status === "Complete"
                      ? "complete"
                      : "progress"
                  }`}
                >
                  {project.status}
                </span>

                <button
                  onClick={() =>
                    navigate(
                      `/admin/judging/${project.id}`
                    )
                  }
                >
                  View Evaluations
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Judging;