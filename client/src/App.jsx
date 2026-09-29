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

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/explore-events" element={<ExploreEvents />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="event-approvals" element={<EventApprovals />} />
          <Route path="events" element={<Events />} />
          <Route path="participants" element={<Participants />} />
          <Route path="teams" element={<Teams />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="judges" element={<Judges />} />
          <Route path="results" element={<Results />} />
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