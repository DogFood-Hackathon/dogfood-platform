import React, { useState } from "react";
import "../../css/Admin/Submissions.css";

function Submissions() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      project: "Crowd Matcher",
      team: "Team Alpha",
      event: "HackFest 2026",
      stack: "React • Python • OpenCV",
      submitted: "28 Sep 2026, 10:42 PM",
      status: "Submitted",
      judging: "Pending",
      judges: []
    },
    {
      id: 2,
      project: "Dark Pattern Detector",
      team: "Code Warriors",
      event: "TechNova 2026",
      stack: "React • Python • DistilBERT",
      submitted: "28 Sep 2026, 08:15 PM",
      status: "Submitted",
      judging: "Complete",
      judges: ["Aman Sharma"]
    },
    {
      id: 3,
      project: "HealthAssist",
      team: "Neural Minds",
      event: "AI for Good",
      stack: "Python • ML • FastAPI",
      submitted: "27 Sep 2026, 11:30 PM",
      status: "Submitted",
      judging: "In Progress",
      judges: ["Priya Kapoor"]
    },
    {
      id: 4,
      project: "Web3 Vault",
      team: "Pixel Coders",
      event: "TechNova 2026",
      stack: "React • Solidity • Node",
      submitted: "27 Sep 2026, 07:48 PM",
      status: "Submitted",
      judging: "Pending",
      judges: []
    },
    {
      id: 5,
      project: "EcoTrack",
      team: "Solo Builders",
      event: "HackFest 2026",
      stack: "React • Node • MongoDB",
      submitted: "26 Sep 2026, 06:20 PM",
      status: "Submitted",
      judging: "Complete",
      judges: ["Aman Sharma"]
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showJudgeModal, setShowJudgeModal] = useState(false);

  const [selectedJudge, setSelectedJudge] = useState("Aman Sharma");

  const judges = [
    "Aman Sharma",
    "Priya Kapoor",
    "Rohit Mehta",
    "Neha Verma",
    "Vivek Singh"
  ];

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.project.toLowerCase().includes(search.toLowerCase()) ||
      submission.team.toLowerCase().includes(search.toLowerCase());

    const matchesEvent =
      eventFilter === "All Events" ||
      submission.event === eventFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      submission.judging === statusFilter;

    return matchesSearch && matchesEvent && matchesStatus;
  });

  const openManageModal = (submission) => {
    setSelectedSubmission(submission);
    setShowManageModal(true);
  };

  const closeManageModal = () => {
    setSelectedSubmission(null);
    setShowManageModal(false);
  };

  const openJudgeModal = (submission) => {
    setSelectedSubmission(submission);
    setSelectedJudge("Aman Sharma");
    setShowJudgeModal(true);
  };

  const closeJudgeModal = () => {
    setSelectedSubmission(null);
    setShowJudgeModal(false);
  };

  const updateJudgingStatus = (status) => {
    if (!selectedSubmission) return;

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? { ...submission, judging: status }
          : submission
      )
    );

    closeManageModal();
  };

  const assignJudge = () => {
    if (!selectedSubmission || !selectedJudge) return;

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? {
              ...submission,
              judges: submission.judges.includes(selectedJudge)
                ? submission.judges
                : [...submission.judges, selectedJudge],
              judging:
                submission.judging === "Pending"
                  ? "In Progress"
                  : submission.judging
            }
          : submission
      )
    );

    closeJudgeModal();
  };

  const unassignJudge = (judge) => {
    if (!selectedSubmission) return;

    const updatedJudges = selectedSubmission.judges.filter(
      (item) => item !== judge
    );

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? {
              ...submission,
              judges: updatedJudges,
              judging:
                updatedJudges.length === 0
                  ? "Pending"
                  : submission.judging
            }
          : submission
      )
    );

    setSelectedSubmission({
      ...selectedSubmission,
      judges: updatedJudges,
      judging:
        updatedJudges.length === 0
          ? "Pending"
          : selectedSubmission.judging
    });
  };

  const disqualifySubmission = () => {
    if (!selectedSubmission) return;

    const confirmed = window.confirm(
      `Disqualify "${selectedSubmission.project}"?\n\nThis submission will no longer be considered for judging results.`
    );

    if (!confirmed) return;

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? {
              ...submission,
              status: "Disqualified",
              judging: "Disqualified"
            }
          : submission
      )
    );

    closeManageModal();
  };

  const restoreSubmission = () => {
    if (!selectedSubmission) return;

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? {
              ...submission,
              status: "Submitted",
              judging:
                submission.judges.length > 0
                  ? "In Progress"
                  : "Pending"
            }
          : submission
      )
    );

    closeManageModal();
  };

  const handleViewSubmission = (submission) => {
    alert(
      `Project: ${submission.project}\nTeam: ${submission.team}\nEvent: ${submission.event}\nTech Stack: ${submission.stack}\nJudges: ${
        submission.judges.length > 0
          ? submission.judges.join(", ")
          : "Not Assigned"
      }`
    );
  };

  return (
    <div className="admin-submissions-page">
      <div className="admin-submissions-header">
        <div>
          <h1>Submissions</h1>
          <p>Review and manage project submissions across all events.</p>
        </div>

        <div className="admin-submissions-count">
          {filteredSubmissions.length} Submissions
        </div>
      </div>

      <div className="admin-submissions-toolbar">
        <div className="admin-submissions-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search projects or teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-submissions-filter"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="All Events">All Events</option>
          <option value="HackFest 2026">HackFest 2026</option>
          <option value="TechNova 2026">TechNova 2026</option>
          <option value="AI for Good">AI for Good</option>
        </select>

        <select
          className="admin-submissions-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Judging Pending</option>
          <option value="In Progress">Judging In Progress</option>
          <option value="Complete">Judging Complete</option>
          <option value="Disqualified">Disqualified</option>
        </select>
      </div>

      <div className="admin-submissions-list">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <div
              className="admin-submission-card"
              key={submission.id}
            >
              <div className="admin-submission-header">
                <div className="admin-submission-project">
                  <div className="admin-submission-icon">◇</div>

                  <div>
                    <h3>{submission.project}</h3>
                    <span>{submission.team}</span>
                  </div>
                </div>

                <span
                  className={`admin-submission-status ${
                    submission.status === "Disqualified"
                      ? "disqualified"
                      : ""
                  }`}
                >
                  {submission.status}
                </span>
              </div>

              <div className="admin-submission-details">
                <div>
                  <span>Hackathon</span>
                  <strong>{submission.event}</strong>
                </div>

                <div>
                  <span>Tech Stack</span>
                  <strong>{submission.stack}</strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>{submission.submitted}</strong>
                </div>

                <div>
                  <span>Judging</span>
                  <strong
                    className={`admin-judging-status ${submission.judging
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {submission.judging}
                  </strong>
                </div>
              </div>

              <div className="admin-submission-judges">
                <span>Assigned Judges</span>

                <div>
                  {submission.judges.length > 0 ? (
                    submission.judges.map((judge) => (
                      <span
                        className="admin-submission-judge-tag"
                        key={judge}
                      >
                        {judge}
                      </span>
                    ))
                  ) : (
                    <span className="admin-submission-no-judge">
                      No judges assigned
                    </span>
                  )}
                </div>
              </div>

              <div className="admin-submission-footer">
                <span>
                  {submission.judges.length} judge
                  {submission.judges.length !== 1 ? "s" : ""} assigned
                </span>

                <div className="admin-submission-actions">
                  <button
                    className="admin-submission-view-btn"
                    onClick={() => handleViewSubmission(submission)}
                  >
                    View
                    <span>→</span>
                  </button>

                  <button
                    className="admin-submission-manage-btn"
                    onClick={() => openManageModal(submission)}
                  >
                    Manage
                  </button>

                  <button
                    className="admin-submission-assign-btn"
                    onClick={() => openJudgeModal(submission)}
                  >
                    Assign Judge
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="admin-submissions-empty">
            <h3>No submissions found</h3>
            <p>
              Try searching with a different project, team, or filter.
            </p>
          </div>
        )}
      </div>

      {showManageModal && selectedSubmission && (
        <div
          className="admin-submission-modal-overlay"
          onClick={closeManageModal}
        >
          <div
            className="admin-submission-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-submission-modal-header">
              <div>
                <h2>Manage Submission</h2>
                <p>{selectedSubmission.project}</p>
              </div>

              <button
                className="admin-submission-modal-close"
                onClick={closeManageModal}
              >
                ×
              </button>
            </div>

            <div className="admin-submission-modal-info">
              <div>
                <span>Team</span>
                <strong>{selectedSubmission.team}</strong>
              </div>

              <div>
                <span>Event</span>
                <strong>{selectedSubmission.event}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedSubmission.status}</strong>
              </div>

              <div>
                <span>Judging</span>
                <strong>{selectedSubmission.judging}</strong>
              </div>
            </div>

            <div className="admin-submission-modal-section">
              <label>Judging Status</label>

              <div className="admin-submission-status-actions">
                <button
                  className={
                    selectedSubmission.judging === "Pending"
                      ? "active"
                      : ""
                  }
                  onClick={() => updateJudgingStatus("Pending")}
                >
                  Pending
                </button>

                <button
                  className={
                    selectedSubmission.judging === "In Progress"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    updateJudgingStatus("In Progress")
                  }
                >
                  In Progress
                </button>

                <button
                  className={
                    selectedSubmission.judging === "Complete"
                      ? "active"
                      : ""
                  }
                  onClick={() => updateJudgingStatus("Complete")}
                >
                  Complete
                </button>
              </div>
            </div>

            <div className="admin-submission-modal-section">
              <label>Assigned Judges</label>

              {selectedSubmission.judges.length > 0 ? (
                <div className="admin-submission-modal-judges">
                  {selectedSubmission.judges.map((judge) => (
                    <div key={judge}>
                      <span>{judge}</span>

                      <button
                        onClick={() => unassignJudge(judge)}
                      >
                        Unassign
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-submission-modal-empty">
                  No judges assigned.
                </p>
              )}
            </div>

            <div className="admin-submission-modal-footer">
              {selectedSubmission.status === "Disqualified" ? (
                <button
                  className="admin-submission-restore-btn"
                  onClick={restoreSubmission}
                >
                  Restore Submission
                </button>
              ) : (
                <button
                  className="admin-submission-disqualify-btn"
                  onClick={disqualifySubmission}
                >
                  Disqualify
                </button>
              )}

              <button
                className="admin-submission-done-btn"
                onClick={closeManageModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showJudgeModal && selectedSubmission && (
        <div
          className="admin-submission-modal-overlay"
          onClick={closeJudgeModal}
        >
          <div
            className="admin-submission-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-submission-modal-header">
              <div>
                <h2>Assign Judge</h2>
                <p>{selectedSubmission.project}</p>
              </div>

              <button
                className="admin-submission-modal-close"
                onClick={closeJudgeModal}
              >
                ×
              </button>
            </div>

            <div className="admin-submission-modal-section">
              <label>Select Judge</label>

              <select
                className="admin-submission-judge-select"
                value={selectedJudge}
                onChange={(e) => setSelectedJudge(e.target.value)}
              >
                {judges.map((judge) => (
                  <option key={judge} value={judge}>
                    {judge}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-submission-current-judges">
              <span>Currently Assigned</span>

              {selectedSubmission.judges.length > 0 ? (
                <div>
                  {selectedSubmission.judges.map((judge) => (
                    <span key={judge}>{judge}</span>
                  ))}
                </div>
              ) : (
                <p>No judges assigned.</p>
              )}
            </div>

            <div className="admin-submission-modal-footer">
              <button
                className="admin-submission-modal-cancel"
                onClick={closeJudgeModal}
              >
                Cancel
              </button>

              <button
                className="admin-submission-done-btn"
                onClick={assignJudge}
              >
                Assign Judge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Submissions;