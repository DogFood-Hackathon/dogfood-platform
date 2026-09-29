import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Judge/AssignedProjects.css";

function AssignedProjects() {
  const navigate = useNavigate();

  const [projects] = useState([
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
  ]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" ||
        project.status === activeFilter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(searchText) ||
        project.team.toLowerCase().includes(searchText) ||
        project.event.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, search]);

  const pendingCount = projects.filter(
    (project) => project.status === "Pending Evaluation"
  ).length;

  const completedCount = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const handleProjectAction = (project) => {
    if (project.status === "Completed") {
      navigate(`/judge/projects/${project.id}/evaluation`);
    } else {
      navigate(`/judge/projects/${project.id}/evaluate`);
    }
  };

  return (
    <div className="assigned-projects">
      <div className="assigned-projects-header">
        <div>
          <h1>Assigned Projects</h1>
          <p>
            Review and evaluate projects assigned to you.
          </p>
        </div>
      </div>

      <div className="assigned-projects-stats">
        <div className="assigned-project-stat">
          <span>Total Assigned</span>
          <strong>{projects.length}</strong>
        </div>

        <div className="assigned-project-stat">
          <span>Pending Evaluation</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="assigned-project-stat">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </div>

      <div className="assigned-projects-toolbar">
        <div className="assigned-projects-search">
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

        <div className="assigned-project-filters">
          {["All", "Pending Evaluation", "Completed"].map(
            (filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "active"
                    : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      <div className="assigned-projects-list">
        {filteredProjects.length === 0 ? (
          <div className="assigned-projects-empty">
            <div>◈</div>
            <h3>No projects found</h3>
            <p>
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              className="assigned-project-card"
              key={project.id}
            >
              <div className="assigned-project-icon">
                ◈
              </div>

              <div className="assigned-project-info">
                <h2>{project.name}</h2>

                <div className="assigned-project-meta">
                  <span>{project.team}</span>
                  <span>•</span>
                  <span>{project.event}</span>
                </div>

                <span className="assigned-project-submitted">
                  Submitted {project.submitted}
                </span>
              </div>

              <div className="assigned-project-status-wrapper">
                <span
                  className={`assigned-project-status ${
                    project.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <button
                className="assigned-project-action"
                onClick={() =>
                  handleProjectAction(project)
                }
              >
                {project.status === "Completed"
                  ? "View Evaluation"
                  : "Evaluate"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AssignedProjects;