import React, { useState } from "react";
import "../../css/Admin/Teams.css";

function Teams() {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team Alpha",
      event: "HackFest 2026",
      leader: "Parag Mamar",
      memberList: ["Parag Mamar", "Rohan Gupta", "Aman Verma", "Kunal Shah"],
      submission: "Submitted",
      status: "Complete"
    },
    {
      id: 2,
      name: "Code Warriors",
      event: "TechNova 2026",
      leader: "Rahul Sharma",
      memberList: ["Rahul Sharma", "Vikas Jain", "Neeraj Singh"],
      submission: "Pending",
      status: "Active"
    },
    {
      id: 3,
      name: "Pixel Coders",
      event: "HackFest 2026",
      leader: "Ananya Verma",
      memberList: ["Ananya Verma", "Ishita Rao", "Megha Joshi", "Aditi Singh"],
      submission: "Submitted",
      status: "Complete"
    },
    {
      id: 4,
      name: "Neural Minds",
      event: "AI for Good",
      leader: "Arjun Mehta",
      memberList: ["Arjun Mehta", "Dev Patel", "Karan Malhotra"],
      submission: "Pending",
      status: "Active"
    },
    {
      id: 5,
      name: "Solo Builders",
      event: "TechNova 2026",
      leader: "Priya Singh",
      memberList: ["Priya Singh"],
      submission: "Submitted",
      status: "Complete"
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTeam, setNewTeam] = useState({
    name: "",
    event: "HackFest 2026",
    leader: ""
  });

  const [newMember, setNewMember] = useState("");

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.leader.toLowerCase().includes(search.toLowerCase());

    const matchesEvent =
      eventFilter === "All Events" ||
      team.event === eventFilter;

    return matchesSearch && matchesEvent;
  });

  const openTeamManager = (team) => {
    setSelectedTeam(team);
    setNewMember("");
    setShowTeamModal(true);
  };

  const closeTeamManager = () => {
    setSelectedTeam(null);
    setShowTeamModal(false);
    setNewMember("");
  };

  const addMember = () => {
    if (!selectedTeam || !newMember.trim()) return;

    const memberName = newMember.trim();

    if (
      selectedTeam.memberList.some(
        (member) => member.toLowerCase() === memberName.toLowerCase()
      )
    ) {
      alert("This member is already in the team.");
      return;
    }

    const updatedTeam = {
      ...selectedTeam,
      memberList: [...selectedTeam.memberList, memberName]
    };

    setTeams((current) =>
      current.map((team) =>
        team.id === selectedTeam.id ? updatedTeam : team
      )
    );

    setSelectedTeam(updatedTeam);
    setNewMember("");
  };

  const removeMember = (member) => {
    if (!selectedTeam) return;

    if (member === selectedTeam.leader) {
      alert("Change the team leader before removing the current leader.");
      return;
    }

    const confirmed = window.confirm(
      `Remove ${member} from ${selectedTeam.name}?`
    );

    if (!confirmed) return;

    const updatedTeam = {
      ...selectedTeam,
      memberList: selectedTeam.memberList.filter(
        (item) => item !== member
      )
    };

    setTeams((current) =>
      current.map((team) =>
        team.id === selectedTeam.id ? updatedTeam : team
      )
    );

    setSelectedTeam(updatedTeam);
  };

  const changeLeader = (leader) => {
    if (!selectedTeam) return;

    const updatedTeam = {
      ...selectedTeam,
      leader
    };

    setTeams((current) =>
      current.map((team) =>
        team.id === selectedTeam.id ? updatedTeam : team
      )
    );

    setSelectedTeam(updatedTeam);
  };

  const removeTeam = (team) => {
    const confirmed = window.confirm(
      `Remove ${team.name}?\n\nAll members will be unassigned from this team.`
    );

    if (!confirmed) return;

    setTeams((current) =>
      current.filter((item) => item.id !== team.id)
    );

    if (selectedTeam?.id === team.id) {
      closeTeamManager();
    }
  };

  const handleCreateTeam = () => {
    if (!newTeam.name.trim() || !newTeam.leader.trim()) {
      alert("Please enter team name and team leader.");
      return;
    }

    const team = {
      id: Date.now(),
      name: newTeam.name.trim(),
      event: newTeam.event,
      leader: newTeam.leader.trim(),
      memberList: [newTeam.leader.trim()],
      submission: "Pending",
      status: "Active"
    };

    setTeams((current) => [...current, team]);

    setNewTeam({
      name: "",
      event: "HackFest 2026",
      leader: ""
    });

    setShowCreateModal(false);
  };

  return (
    <div className="admin-teams-page">
      <div className="admin-teams-header">
        <div>
          <h1>Teams</h1>
          <p>Manage teams formed across all hackathons.</p>
        </div>

        <div className="admin-teams-header-actions">
          <div className="admin-teams-count">
            {filteredTeams.length} Teams
          </div>

          <button
            className="admin-create-team-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <span>+</span>
            Create Team
          </button>
        </div>
      </div>

      <div className="admin-teams-toolbar">
        <div className="admin-teams-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search teams or team leaders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-teams-filter"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="All Events">All Events</option>
          <option value="HackFest 2026">HackFest 2026</option>
          <option value="TechNova 2026">TechNova 2026</option>
          <option value="AI for Good">AI for Good</option>
        </select>
      </div>

      <div className="admin-teams-grid">
        {filteredTeams.map((team) => (
          <div className="admin-team-card" key={team.id}>
            <div className="admin-team-card-header">
              <div className="admin-team-title">
                <div className="admin-team-icon">◇</div>

                <div>
                  <h3>{team.name}</h3>
                  <span>{team.event}</span>
                </div>
              </div>

              <span
                className={`admin-team-status ${team.status.toLowerCase()}`}
              >
                {team.status}
              </span>
            </div>

            <div className="admin-team-info">
              <div>
                <span>Team Leader</span>
                <strong>{team.leader}</strong>
              </div>

              <div>
                <span>Members</span>
                <strong>{team.memberList.length}</strong>
              </div>

              <div>
                <span>Submission</span>
                <strong
                  className={
                    team.submission === "Submitted"
                      ? "submitted"
                      : "pending"
                  }
                >
                  {team.submission}
                </strong>
              </div>
            </div>

            <div className="admin-team-actions">
              <button
                className="admin-team-view-btn"
                onClick={() => openTeamManager(team)}
              >
                Manage Team
                <span>→</span>
              </button>

              <button
                className="admin-team-remove-btn"
                onClick={() => removeTeam(team)}
              >
                Remove Team
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="admin-teams-empty">
          <h3>No teams found</h3>
          <p>Try searching with a different team or leader name.</p>
        </div>
      )}

      {showTeamModal && selectedTeam && (
        <div
          className="admin-team-modal-overlay"
          onClick={closeTeamManager}
        >
          <div
            className="admin-team-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-team-modal-header">
              <div>
                <h2>{selectedTeam.name}</h2>
                <p>{selectedTeam.event}</p>
              </div>

              <button
                className="admin-team-modal-close"
                onClick={closeTeamManager}
              >
                ×
              </button>
            </div>

            <div className="admin-team-modal-section">
              <label>Team Leader</label>

              <select
                value={selectedTeam.leader}
                onChange={(e) => changeLeader(e.target.value)}
              >
                {selectedTeam.memberList.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-team-modal-section">
              <label>Members</label>

              <div className="admin-team-member-list">
                {selectedTeam.memberList.map((member) => (
                  <div
                    className="admin-team-member"
                    key={member}
                  >
                    <div>
                      <strong>{member}</strong>

                      {member === selectedTeam.leader && (
                        <span>Leader</span>
                      )}
                    </div>

                    <button
                      onClick={() => removeMember(member)}
                      disabled={member === selectedTeam.leader}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-team-modal-section">
              <label>Add Member</label>

              <div className="admin-team-add-member">
                <input
                  type="text"
                  placeholder="Enter participant name"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addMember();
                    }
                  }}
                />

                <button onClick={addMember}>
                  Add
                </button>
              </div>
            </div>

            <div className="admin-team-modal-footer">
              <button
                className="admin-team-modal-remove"
                onClick={() => removeTeam(selectedTeam)}
              >
                Remove Team
              </button>

              <button
                className="admin-team-modal-done"
                onClick={closeTeamManager}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div
          className="admin-team-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="admin-team-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-team-modal-header">
              <div>
                <h2>Create Team</h2>
                <p>Create a team for a hackathon.</p>
              </div>

              <button
                className="admin-team-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-team-modal-section">
              <label>Team Name</label>

              <input
                className="admin-team-form-input"
                type="text"
                placeholder="Enter team name"
                value={newTeam.name}
                onChange={(e) =>
                  setNewTeam({
                    ...newTeam,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="admin-team-modal-section">
              <label>Event</label>

              <select
                value={newTeam.event}
                onChange={(e) =>
                  setNewTeam({
                    ...newTeam,
                    event: e.target.value
                  })
                }
              >
                <option value="HackFest 2026">HackFest 2026</option>
                <option value="TechNova 2026">TechNova 2026</option>
                <option value="AI for Good">AI for Good</option>
              </select>
            </div>

            <div className="admin-team-modal-section">
              <label>Team Leader</label>

              <input
                className="admin-team-form-input"
                type="text"
                placeholder="Enter leader name"
                value={newTeam.leader}
                onChange={(e) =>
                  setNewTeam({
                    ...newTeam,
                    leader: e.target.value
                  })
                }
              />
            </div>

            <div className="admin-team-modal-footer">
              <button
                className="admin-team-modal-cancel"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>

              <button
                className="admin-team-modal-done"
                onClick={handleCreateTeam}
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;