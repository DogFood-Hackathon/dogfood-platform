import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import ExploreEvents from "./pages/ExploreEvents";
import Navbar from "./components/navbar";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EventApprovals from "./pages/Admin/EventApprovals";
import Events from "./pages/Admin/Events";
import Participants from "./pages/Admin/Participants";
import Teams from "./pages/Admin/Teams";
import Submissions from "./pages/Admin/Submissions";
import Judges from "./pages/Admin/Judges";
import Results from "./pages/Admin/Results";
import JudgeLayout from "./components/Judge/JudgeLayout";

import MyCreatedHackathons from "./pages/MyCreatedHackathons";
import JudgeDashboard from "./pages/Judge/JudgeDashboard";
import JudgeEvaluation from "./pages/Judge/JudgeEvaluation";
import Judging from "./pages/Admin/Judging";
import JudgingEvaluation from "./pages/Admin/JudgingEvaluation";
import AssignedProjects from "./pages/Judge/AssignedProjects";
import JudgeEvaluationView from "./pages/Judge/JudgeEvaluationView";
import OrganizerLayout from "./components/Organizer/OrganizerLayout";
import OrganizerDashboard from "./pages/Organizer/OrganizerDashboard";
import OrganizerHackathons from "./pages/Organizer/OrganizerHackathons";
import OrganizerParticipants from "./pages/Organizer/OrganizerParticipants";
import OrganizerTeams from "./pages/Organizer/OrganizerTeams";

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isJudgeRoute=location.pathname.startsWith("/judge");
  const isOrganizeRoute=location.pathname.startsWith("/organizer");

  return (
    <>
      {(!isAdminRoute && !isJudgeRoute && !isOrganizeRoute) && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/my-created-hackathons" element={<MyCreatedHackathons />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="event-approvals" element={<EventApprovals />} />
          <Route path="events" element={<Events />} />
          <Route path="participants" element={<Participants />} />
          <Route path="teams" element={<Teams />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="judges" element={<Judges />} />
          <Route path="judging" element={<Judging/>} />
          <Route
    path="judging/:projectId"
    element={<JudgingEvaluation />}
  />
          <Route path="results" element={<Results />} />
        </Route>

        



        <Route path="/judge" element={<JudgeLayout />}>
  <Route index element={<JudgeDashboard />} />
  <Route path="projects" element={<AssignedProjects />} />
  <Route
    path="projects/:projectId/evaluate"
    element={<JudgeEvaluation />}
  />
  <Route
    path="projects/:projectId/evaluation"
    element={<JudgeEvaluationView />}
  />
</Route>






<Route path="/organizer" element={<OrganizerLayout />}>
  <Route index element={<OrganizerDashboard />} />
  <Route path="/organizer/hackathons" element={<OrganizerHackathons />} />
  <Route path="/organizer/participants" element={<OrganizerParticipants />} />
  <Route path="/organizer/teams" element={<OrganizerTeams />} />
</Route>


      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;