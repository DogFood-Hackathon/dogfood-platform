import React, { useMemo, useState } from "react";
import "../../css/Admin/Results.css";

function Results() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [results, setResults] = useState([
    {
      id: 1,
      project: "Crowd Matcher",
      team: "Team Alpha",
      event: "HackFest 2026",
      score: 91.5,
      rank: 1,
      status: "Published",
      judgesCompleted: "5 / 5",
      disqualified: false,
      note: ""
    },
    {
      id: 2,
      project: "Dark Pattern Detector",
      team: "Code Warriors",
      event: "TechNova 2026",
      score: 88.7,
      rank: 2,
      status: "Published",
      judgesCompleted: "5 / 5",
      disqualified: false,
      note: ""
    },
    {
      id: 3,
      project: "HealthAssist",
      team: "Neural Minds",
      event: "AI for Good",
      score: 86.2,
      rank: 3,
      status: "Draft",
      judgesCompleted: "4 / 5",
      disqualified: false,
      note: ""
    },
    {
      id: 4,
      project: "Web3 Vault",
      team: "Pixel Coders",
      event: "TechNova 2026",
      score: 82.9,
      rank: 4,
      status: "Published",
      judgesCompleted: "5 / 5",
      disqualified: false,
      note: ""
    },
    {
      id: 5,
      project: "EcoTrack",
      team: "Solo Builders",
      event: "HackFest 2026",
      score: 78.4,
      rank: 5,
      status: "Draft",
      judgesCompleted: "5 / 5",
      disqualified: false,
      note: ""
    },
    {
      id: 6,
      project: "SecurePay",
      team: "Byte Force",
      event: "Web3 Unite",
      score: 61.3,
      rank: 6,
      status: "Disqualified",
      judgesCompleted: "5 / 5",
      disqualified: true,
      note: "Rule violation"
    }
  ]);

  const [selectedResult, setSelectedResult] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const events = [
    "HackFest 2026",
    "TechNova 2026",
    "AI for Good",
    "Web3 Unite"
  ];

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const matchesSearch =
        result.project.toLowerCase().includes(search.toLowerCase()) ||
        result.team.toLowerCase().includes(search.toLowerCase());

      const matchesEvent =
        eventFilter === "All Events" ||
        result.event === eventFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        result.status === statusFilter;

      return matchesSearch && matchesEvent && matchesStatus;
    });
  }, [results, search, eventFilter, statusFilter]);

  const openEditModal = (result) => {
    setSelectedResult({
      ...result
    });
    setShowEditModal(true);
  };

  const updateSelectedResult = (field, value) => {
    setSelectedResult((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const saveResultChanges = () => {
    if (!selectedResult) return;

    const updatedResult = {
      ...selectedResult,
      score: Number(selectedResult.score),
      rank: Number(selectedResult.rank)
    };

    setResults((previous) =>
      previous.map((result) =>
        result.id === updatedResult.id
          ? updatedResult
          : result
      )
    );

    setShowEditModal(false);
    setSelectedResult(null);
  };

  const togglePublish = (result) => {
    const nextStatus =
      result.status === "Published"
        ? "Draft"
        : "Published";

    setResults((previous) =>
      previous.map((item) =>
        item.id === result.id
          ? {
              ...item,
              status: item.disqualified
                ? "Disqualified"
                : nextStatus
            }
          : item
      )
    );
  };

  const toggleDisqualification = (result) => {
    const nextDisqualified = !result.disqualified;

    setResults((previous) =>
      previous.map((item) =>
        item.id === result.id
          ? {
              ...item,
              disqualified: nextDisqualified,
              status: nextDisqualified
                ? "Disqualified"
                : "Draft"
            }
          : item
      )
    );
  };

  const exportCSV = () => {
    const headers = [
      "Rank",
      "Project",
      "Team",
      "Event",
      "Score",
      "Judges Completed",
      "Status"
    ];

    const rows = results.map((result) => [
      result.rank,
      result.project,
      result.team,
      result.event,
      result.score,
      result.judgesCompleted,
      result.status
    ]);

    const csv = [
      headers,
      ...rows
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "dogfood-results.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const publishedCount = results.filter(
    (result) => result.status === "Published"
  ).length;

  const draftCount = results.filter(
    (result) => result.status === "Draft"
  ).length;

  const disqualifiedCount = results.filter(
    (result) => result.disqualified
  ).length;

  return (
    <div className="results-page">
      <div className="results-header">
        <div>
          <h1>Results</h1>
          <p>
            Manage rankings, scores and final hackathon results
          </p>
        </div>

        <button
          className="results-export-btn"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </div>

      <div className="results-stats">
        <div className="result-stat-card">
          <span>Total Results</span>
          <strong>{results.length}</strong>
        </div>

        <div className="result-stat-card">
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>

        <div className="result-stat-card">
          <span>Draft</span>
          <strong>{draftCount}</strong>
        </div>

        <div className="result-stat-card">
          <span>Disqualified</span>
          <strong>{disqualifiedCount}</strong>
        </div>
      </div>

      <div className="results-toolbar">
        <input
          type="text"
          placeholder="Search project or team..."
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

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Disqualified</option>
        </select>
      </div>

      <div className="results-list">
        {filteredResults.map((result) => (
          <div
            className={`result-card ${
              result.disqualified ? "result-disqualified" : ""
            }`}
            key={result.id}
          >
            <div className="result-rank">
              <span>Rank</span>
              <strong>#{result.rank}</strong>
            </div>

            <div className="result-project">
              <h3>{result.project}</h3>
              <p>{result.team}</p>

              <div className="result-event">
                {result.event}
              </div>
            </div>

            <div className="result-score">
              <span>Final Score</span>
              <strong>{result.score}</strong>
            </div>

            <div className="result-judges">
              <span>Judging</span>
              <strong>{result.judgesCompleted}</strong>
            </div>

            <div className="result-status">
              <span
                className={`result-status-badge ${result.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {result.status}
              </span>
            </div>

            <div className="result-actions">
              <button
                className="result-edit-btn"
                onClick={() => openEditModal(result)}
              >
                Edit Result
              </button>

              <button
                className="result-secondary-btn"
                onClick={() => togglePublish(result)}
                disabled={result.disqualified}
              >
                {result.status === "Published"
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                className="result-danger-btn"
                onClick={() =>
                  toggleDisqualification(result)
                }
              >
                {result.disqualified
                  ? "Restore"
                  : "Disqualify"}
              </button>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="results-empty">
            No results found.
          </div>
        )}
      </div>

      {showEditModal && selectedResult && (
        <div className="result-modal-overlay">
          <div className="result-modal">
            <div className="result-modal-header">
              <div>
                <h2>Edit Result</h2>
                <p>{selectedResult.project}</p>
              </div>

              <button
                className="result-modal-close"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedResult(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="result-form">
              <div className="result-form-field">
                <label>Project</label>
                <input
                  type="text"
                  value={selectedResult.project}
                  onChange={(e) =>
                    updateSelectedResult(
                      "project",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="result-form-field">
                <label>Team</label>
                <input
                  type="text"
                  value={selectedResult.team}
                  onChange={(e) =>
                    updateSelectedResult(
                      "team",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="result-form-grid">
                <div className="result-form-field">
                  <label>Final Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={selectedResult.score}
                    onChange={(e) =>
                      updateSelectedResult(
                        "score",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="result-form-field">
                  <label>Rank</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedResult.rank}
                    onChange={(e) =>
                      updateSelectedResult(
                        "rank",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="result-form-field">
                <label>Status</label>
                <select
                  value={selectedResult.status}
                  onChange={(e) =>
                    updateSelectedResult(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Disqualified</option>
                </select>
              </div>

              <div className="result-form-field">
                <label>Override Note</label>
                <textarea
                  placeholder="Reason for changing this result..."
                  value={selectedResult.note}
                  onChange={(e) =>
                    updateSelectedResult(
                      "note",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="result-form-actions">
                <button
                  className="result-secondary-btn"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedResult(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="result-edit-btn"
                  onClick={saveResultChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;