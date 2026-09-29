import React, { useMemo, useState } from "react";
import "../../css/Organizer/OrganizerTeams.css";

function OrganizerTeams() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team Alpha",
      hackathon: "HackFest 2026",
      leader: "Parag Mamar",
      members: ["Parag Mamar", "Rahul Sharma", "Aman Verma"],
      status: "Active"
    },
    {
      id: 2,
      name: "Code Warriors",
      hackathon: "HackFest 2026",
      leader: "Rahul Sharma",
      members: ["Rahul Sharma", "Priya Singh"],
      status: "Active"
    },
    {
      id: 3,
      name: "Neural Minds",
      hackathon: "TechSprint 2026",
      leader: "Ananya Verma",
      members: ["Ananya Verma", "Karan Singh", "Riya Gupta"],
      status: "Active"
    },
    {
      id: 4,
      name: "Pixel Coders",
      hackathon: "CodeStorm 2026",
      leader: "Priya Singh",
      members: ["Priya Singh", "Arjun Mehta"],
      status: "Active"
    },
    {
      id: 5,
      name: "Solo Builders",
      hackathon: "HackFest 2026",
      leader: "Arjun Mehta",
      members: ["Arjun Mehta"],
      status: "Active"
    }
  ]);

  const [search, setSearch] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState("All Hackathons");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const hackathons = [
    "All Hackathons",
    "HackFest 2026",
    "TechSprint 2026",
    "CodeStorm 2026"
  ];

  const filteredTeams = useMemo(() => {
    const searchText = search.toLowerCase();

    return teams.filter((team) => {
      const matchesHackathon =
        selectedHackathon === "All Hackathons" ||
        team.hackathon === selectedHackathon;

      const matchesSearch =
        team.name.toLowerCase().includes(searchText) ||
        team.leader.toLowerCase().includes(searchText) ||
        team.hackathon.toLowerCase().includes(searchText) ||
        team.members.some((member) =>
          member.toLowerCase().includes(searchText)
        );

      return matchesHackathon && matchesSearch;
    });
  }, [teams, search, selectedHackathon]);

  const activeTeams = teams.filter(
    (team) => team.status === "Active"
  ).length;

  const totalMembers = teams.reduce(
    (total, team) => total + team.members.length,
    0
  );

  const removeTeam = (team) => {
    const confirmed = window.confirm(
      `Remove "${team.name}" from ${team.hackathon}?`
    );

    if (!confirmed) return;

    setTeams((previous) =>
      previous.filter((item) => item.id !== team.id)
    );
  };

  const addMember = (team) => {
    const memberName = window.prompt(
      `Enter participant name to add to ${team.name}:`
    );

    if (!memberName || !memberName.trim()) return;

    setTeams((previous) =>
      previous.map((item) => {
        if (item.id !== team.id) return item;

        return {
          ...item,
          members: [...item.members, memberName.trim()]
        };
      })
    );
  };

  const removeMember = (team) => {
    if (team.members.length <= 1) {
      window.alert("A team must have at least one member.");
      return;
    }

    const memberName = window.prompt(
      `Enter member name to remove from ${team.name}:`
    );

    if (!memberName || !memberName.trim()) return;

    const memberExists = team.members.some(
      (member) =>
        member.toLowerCase() === memberName.trim().toLowerCase()
    );

    if (!memberExists) {
      window.alert("Member not found in this team.");
      return;
    }

    setTeams((previous) =>
      previous.map((item) => {
        if (item.id !== team.id) return item;

        const updatedMembers = item.members.filter(
          (member) =>
            member.toLowerCase() !==
            memberName.trim().toLowerCase()
        );

        const updatedLeader =
          item.leader.toLowerCase() ===
          memberName.trim().toLowerCase()
            ? updatedMembers[0]
            : item.leader;

        return {
          ...item,
          members: updatedMembers,
          leader: updatedLeader
        };
      })
    );
  };

  const changeLeader = (team) => {
    if (team.members.length < 2) {
      window.alert(
        "A team needs at least two members to change the leader."
      );
      return;
    }

    const newLeader = window.prompt(
      `Enter the name of the new leader:\n\n${team.members.join("\n")}`
    );

    if (!newLeader || !newLeader.trim()) return;

    const selectedMember = team.members.find(
      (member) =>
        member.toLowerCase() ===
        newLeader.trim().toLowerCase()
    );

    if (!selectedMember) {
      window.alert(
        "The selected participant is not a member of this team."
      );
      return;
    }

    setTeams((previous) =>
      previous.map((item) =>
        item.id === team.id
          ? { ...item, leader: selectedMember }
          : item
      )
    );
  };

  return (
    <div className="organizer-teams">
      <div className="organizer-teams-header">
        <div>
          <span className="organizer-page-eyebrow">
            ORGANIZER
          </span>
          <h1>Teams</h1>
          <p>Create and manage teams across your hackathons.</p>
        </div>

        <button
          className="organizer-create-team-btn"
          onClick={() =>
            window.alert("Create Team form will be connected here.")
          }
        >
          <span>+</span>
          Create Team
        </button>
      </div>

      <div className="organizer-team-stats">
        <div className="organizer-team-stat">
          <span>Total Teams</span>
          <strong>{teams.length}</strong>
          <small>Across all hackathons</small>
        </div>

        <div className="organizer-team-stat">
          <span>Active Teams</span>
          <strong>{activeTeams}</strong>
          <small>Currently participating</small>
        </div>

        <div className="organizer-team-stat">
          <span>Total Members</span>
          <strong>{totalMembers}</strong>
          <small>Across all teams</small>
        </div>
      </div>

      <section className="organizer-teams-panel">
        <div className="organizer-teams-toolbar">
          <div className="organizer-team-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search team, leader or member..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="organizer-team-hackathon-filter">
            <span>Hackathon</span>

            <select
              value={selectedHackathon}
              onChange={(event) =>
                setSelectedHackathon(event.target.value)
              }
            >
              {hackathons.map((hackathon) => (
                <option key={hackathon} value={hackathon}>
                  {hackathon}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="organizer-teams-list">
          {filteredTeams.map((team) => (
            <div
              className="organizer-team-card"
              key={team.id}
            >
              <div className="organizer-team-card-main">
                <div className="organizer-team-icon">◈</div>

                <div className="organizer-team-info">
                  <div className="organizer-team-title-row">
                    <h2>{team.name}</h2>
                    <span className="organizer-team-status">
                      {team.status}
                    </span>
                  </div>

                  <p className="organizer-team-hackathon">
                    {team.hackathon}
                  </p>

                  <div className="organizer-team-meta">
                    <span>
                      Leader: <strong>{team.leader}</strong>
                    </span>

                    <span>
                      Members:{" "}
                      <strong>{team.members.length}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="organizer-team-members">
                {team.members.map((member) => (
                  <span key={member}>
                    {member}
                    {member === team.leader && (
                      <small> Leader</small>
                    )}
                  </span>
                ))}
              </div>

              <div className="organizer-team-actions">
                <button
                  className="organizer-team-view-btn"
                  onClick={() => setSelectedTeam(team)}
                >
                  View Details
                </button>

                <button
                  className="organizer-team-action-btn"
                  onClick={() => addMember(team)}
                >
                  Add Member
                </button>

                <button
                  className="organizer-team-action-btn"
                  onClick={() => removeMember(team)}
                >
                  Remove Member
                </button>

                <button
                  className="organizer-team-action-btn"
                  onClick={() => changeLeader(team)}
                >
                  Change Leader
                </button>

                <button
                  className="organizer-team-delete-btn"
                  onClick={() => removeTeam(team)}
                >
                  Remove Team
                </button>
              </div>
            </div>
          ))}

          {filteredTeams.length === 0 && (
            <div className="organizer-teams-empty">
              <h3>No teams found</h3>
              <p>Try changing the hackathon or search term.</p>
            </div>
          )}
        </div>
      </section>

      {selectedTeam && (
        <div
          className="organizer-team-modal-overlay"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="organizer-team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="organizer-team-modal-header">
              <div>
                <span className="organizer-page-eyebrow">
                  TEAM DETAILS
                </span>
                <h2>{selectedTeam.name}</h2>
                <p>{selectedTeam.hackathon}</p>
              </div>

              <button
                className="organizer-team-modal-close"
                onClick={() => setSelectedTeam(null)}
              >
                ×
              </button>
            </div>

            <div className="organizer-team-modal-content">
              <div className="organizer-team-detail-row">
                <span>Team Name</span>
                <strong>{selectedTeam.name}</strong>
              </div>

              <div className="organizer-team-detail-row">
                <span>Hackathon</span>
                <strong>{selectedTeam.hackathon}</strong>
              </div>

              <div className="organizer-team-detail-row">
                <span>Team Leader</span>
                <strong>{selectedTeam.leader}</strong>
              </div>

              <div className="organizer-team-detail-row">
                <span>Total Members</span>
                <strong>{selectedTeam.members.length}</strong>
              </div>

              <div className="organizer-team-detail-row">
                <span>Status</span>
                <strong className="organizer-team-modal-status">
                  {selectedTeam.status}
                </strong>
              </div>
            </div>

            <div className="organizer-team-members-section">
              <h3>Team Members</h3>

              <div className="organizer-team-modal-members">
                {selectedTeam.members.map((member) => (
                  <div
                    className="organizer-team-modal-member"
                    key={member}
                  >
                    <div className="organizer-team-modal-member-avatar">
                      {member.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{member}</strong>

                      {member === selectedTeam.leader && (
                        <span>Team Leader</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="organizer-team-modal-actions">
              <button
                className="organizer-team-modal-close-btn"
                onClick={() => setSelectedTeam(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerTeams;