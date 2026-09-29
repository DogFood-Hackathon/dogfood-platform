import React, { useMemo, useState } from "react";
import "../../css/Admin/Judges.css";

function Judges() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [judges, setJudges] = useState([
    {
      id: 1,
      name: "Aman Sharma",
      email: "aman@example.com",
      events: ["HackFest 2026"],
      assignedProjects: 18,
      judgedProjects: 12,
      status: "Active"
    },
    {
      id: 2,
      name: "Neha Kapoor",
      email: "neha@example.com",
      events: ["TechNova 2026"],
      assignedProjects: 22,
      judgedProjects: 22,
      status: "Active"
    },
    {
      id: 3,
      name: "Rohit Verma",
      email: "rohit@example.com",
      events: ["AI for Good"],
      assignedProjects: 15,
      judgedProjects: 9,
      status: "Active"
    },
    {
      id: 4,
      name: "Priya Mehta",
      email: "priya@example.com",
      events: ["HackFest 2026", "TechNova 2026"],
      assignedProjects: 26,
      judgedProjects: 18,
      status: "Active"
    },
    {
      id: 5,
      name: "Karan Singh",
      email: "karan@example.com",
      events: ["Web3 Unite"],
      assignedProjects: 14,
      judgedProjects: 14,
      status: "Inactive"
    }
  ]);

  const [selectedJudge, setSelectedJudge] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [newJudge, setNewJudge] = useState({
    name: "",
    email: "",
    event: "HackFest 2026"
  });

  const events = [
    "HackFest 2026",
    "TechNova 2026",
    "AI for Good",
    "Web3 Unite"
  ];

  const filteredJudges = useMemo(() => {
    return judges.filter((judge) => {
      const matchesSearch =
        judge.name.toLowerCase().includes(search.toLowerCase()) ||
        judge.email.toLowerCase().includes(search.toLowerCase());

      const matchesEvent =
        eventFilter === "All Events" ||
        judge.events.includes(eventFilter);

      return matchesSearch && matchesEvent;
    });
  }, [judges, search, eventFilter]);

  const totalJudges = judges.length;

  const activeJudges = judges.filter(
    (judge) => judge.status === "Active"
  ).length;

  const projectsAssigned = judges.reduce(
    (total, judge) => total + judge.assignedProjects,
    0
  );

  const judgingCompleted = judges.reduce(
    (total, judge) => total + judge.judgedProjects,
    0
  );

  const openManageModal = (judge) => {
    setSelectedJudge(judge);
    setShowManageModal(true);
  };

  const openAssignModal = (judge) => {
    setSelectedJudge(judge);
    setShowAssignModal(true);
  };

  const toggleJudgeStatus = () => {
    if (!selectedJudge) return;

    setJudges((previous) =>
      previous.map((judge) =>
        judge.id === selectedJudge.id
          ? {
              ...judge,
              status:
                judge.status === "Active"
                  ? "Inactive"
                  : "Active"
            }
          : judge
      )
    );

    setSelectedJudge((previous) =>
      previous
        ? {
            ...previous,
            status:
              previous.status === "Active"
                ? "Inactive"
                : "Active"
          }
        : null
    );
  };

  const removeJudge = () => {
    if (!selectedJudge) return;

    const confirmed = window.confirm(
      `Remove ${selectedJudge.name} from judges?`
    );

    if (!confirmed) return;

    setJudges((previous) =>
      previous.filter((judge) => judge.id !== selectedJudge.id)
    );

    setShowManageModal(false);
    setSelectedJudge(null);
  };

  const handleAddJudge = () => {
    if (!newJudge.name.trim() || !newJudge.email.trim()) {
      alert("Please enter judge name and email.");
      return;
    }

    const judge = {
      id: Date.now(),
      name: newJudge.name,
      email: newJudge.email,
      events: [newJudge.event],
      assignedProjects: 0,
      judgedProjects: 0,
      status: "Active"
    };

    setJudges((previous) => [...previous, judge]);

    setNewJudge({
      name: "",
      email: "",
      event: "HackFest 2026"
    });

    setShowAddModal(false);
  };

  const assignProjects = () => {
    if (!selectedJudge) return;

    setJudges((previous) =>
      previous.map((judge) =>
        judge.id === selectedJudge.id
          ? {
              ...judge,
              assignedProjects: judge.assignedProjects + 3
            }
          : judge
      )
    );

    setSelectedJudge((previous) =>
      previous
        ? {
            ...previous,
            assignedProjects: previous.assignedProjects + 3
          }
        : null
    );

    setShowAssignModal(false);
  };

  return (
    <div className="judges-page">
      <div className="judges-header">
        <div>
          <h1>Judges</h1>
          <p>Manage judges and their judging assignments</p>
        </div>

        <button
          className="judges-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Judge
        </button>
      </div>

      <div className="judges-stats">
        <div className="judge-stat-card">
          <span>Total Judges</span>
          <strong>{totalJudges}</strong>
        </div>

        <div className="judge-stat-card">
          <span>Active Judges</span>
          <strong>{activeJudges}</strong>
        </div>

        <div className="judge-stat-card">
          <span>Projects Assigned</span>
          <strong>{projectsAssigned}</strong>
        </div>

        <div className="judge-stat-card">
          <span>Judging Completed</span>
          <strong>{judgingCompleted}</strong>
        </div>
      </div>

      <div className="judges-toolbar">
        <input
          type="text"
          placeholder="Search judges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option>All Events</option>
          {events.map((event) => (
            <option key={event}>{event}</option>
          ))}
        </select>
      </div>

      <div className="judges-list">
        {filteredJudges.map((judge) => {
          const progress =
            judge.assignedProjects === 0
              ? 0
              : Math.round(
                  (judge.judgedProjects /
                    judge.assignedProjects) *
                    100
                );

          return (
            <div className="judge-card" key={judge.id}>
              <div className="judge-main">
                <div className="judge-avatar">
                  {judge.name.charAt(0)}
                </div>

                <div className="judge-info">
                  <h3>{judge.name}</h3>
                  <p>{judge.email}</p>

                  <div className="judge-events">
                    {judge.events.map((event) => (
                      <span key={event}>{event}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="judge-projects">
                <span>Assigned Projects</span>
                <strong>{judge.assignedProjects}</strong>
              </div>

              <div className="judge-progress">
                <div className="judge-progress-top">
                  <span>Progress</span>
                  <strong>
                    {judge.judgedProjects} /{" "}
                    {judge.assignedProjects}
                  </strong>
                </div>

                <div className="judge-progress-bar">
                  <div
                    style={{
                      width: `${progress}%`
                    }}
                  ></div>
                </div>

                <small>{progress}% judged</small>
              </div>

              <div className="judge-status">
                <span
                  className={`judge-status-badge ${
                    judge.status.toLowerCase()
                  }`}
                >
                  {judge.status}
                </span>
              </div>

              <div className="judge-actions">
                <button
                  className="judge-secondary-btn"
                  onClick={() => openManageModal(judge)}
                >
                  Manage
                </button>

                <button
                  className="judge-primary-btn"
                  onClick={() => openAssignModal(judge)}
                >
                  Assign Projects
                </button>
              </div>
            </div>
          );
        })}

        {filteredJudges.length === 0 && (
          <div className="judges-empty">
            No judges found.
          </div>
        )}
      </div>

      {showManageModal && selectedJudge && (
        <div className="judge-modal-overlay">
          <div className="judge-modal">
            <div className="judge-modal-header">
              <div>
                <h2>Manage Judge</h2>
                <p>{selectedJudge.name}</p>
              </div>

              <button
                className="judge-modal-close"
                onClick={() => setShowManageModal(false)}
              >
                ×
              </button>
            </div>

            <div className="judge-modal-content">
              <div className="judge-detail-row">
                <span>Email</span>
                <strong>{selectedJudge.email}</strong>
              </div>

              <div className="judge-detail-row">
                <span>Events</span>
                <strong>
                  {selectedJudge.events.join(", ")}
                </strong>
              </div>

              <div className="judge-detail-row">
                <span>Assigned Projects</span>
                <strong>
                  {selectedJudge.assignedProjects}
                </strong>
              </div>

              <div className="judge-detail-row">
                <span>Judged Projects</span>
                <strong>
                  {selectedJudge.judgedProjects}
                </strong>
              </div>

              <div className="judge-manage-actions">
                <button
                  className="judge-secondary-btn"
                  onClick={toggleJudgeStatus}
                >
                  {selectedJudge.status === "Active"
                    ? "Deactivate Judge"
                    : "Activate Judge"}
                </button>

                <button
                  className="judge-danger-btn"
                  onClick={removeJudge}
                >
                  Remove Judge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="judge-modal-overlay">
          <div className="judge-modal">
            <div className="judge-modal-header">
              <div>
                <h2>Add Judge</h2>
                <p>Add a new judge to the platform</p>
              </div>

              <button
                className="judge-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div className="judge-form">
              <label>Judge Name</label>
              <input
                type="text"
                placeholder="Enter judge name"
                value={newJudge.name}
                onChange={(e) =>
                  setNewJudge({
                    ...newJudge,
                    name: e.target.value
                  })
                }
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter judge email"
                value={newJudge.email}
                onChange={(e) =>
                  setNewJudge({
                    ...newJudge,
                    email: e.target.value
                  })
                }
              />

              <label>Assign Event</label>
              <select
                value={newJudge.event}
                onChange={(e) =>
                  setNewJudge({
                    ...newJudge,
                    event: e.target.value
                  })
                }
              >
                {events.map((event) => (
                  <option key={event}>{event}</option>
                ))}
              </select>

              <button
                className="judge-primary-btn judge-form-submit"
                onClick={handleAddJudge}
              >
                Add Judge
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedJudge && (
        <div className="judge-modal-overlay">
          <div className="judge-modal">
            <div className="judge-modal-header">
              <div>
                <h2>Assign Projects</h2>
                <p>
                  Assign projects to {selectedJudge.name}
                </p>
              </div>

              <button
                className="judge-modal-close"
                onClick={() => setShowAssignModal(false)}
              >
                ×
              </button>
            </div>

            <div className="judge-assign-content">
              <p>
                This will assign 3 additional projects to this
                judge for the selected event.
              </p>

              <div className="judge-assign-summary">
                <div>
                  <span>Current</span>
                  <strong>
                    {selectedJudge.assignedProjects}
                  </strong>
                </div>

                <div>
                  <span>After Assignment</span>
                  <strong>
                    {selectedJudge.assignedProjects + 3}
                  </strong>
                </div>
              </div>

              <button
                className="judge-primary-btn judge-form-submit"
                onClick={assignProjects}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Judges;