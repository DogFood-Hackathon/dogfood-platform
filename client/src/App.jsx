import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import ExploreEvents from "./pages/ExploreEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/explore-events" element={<ExploreEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;