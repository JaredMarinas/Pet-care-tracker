import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar.jsx";
import Home from "./Home.jsx";
import Health from "./Health.jsx";
import Calendar from "./Calendar.jsx";
import More from "./More.jsx";
import AddVaccine from "./AddVaccine.jsx";
import AddEvent from "./AddEvent.jsx";

const CURRENT_USER = "Jared";

function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (petId, label) => {
    setLogs((prev) => [
      {
        id: Date.now(),
        petId,
        label,
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        done: true,
        loggedBy: CURRENT_USER,
      },
      ...prev,
    ]);
  };

  const toggleLog = (id) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id
          ? { ...log, done: !log.done, loggedBy: !log.done ? CURRENT_USER : null }
          : log
      )
    );
  };

  const homeProps = { logs, onAddLog: addLog, onToggleLog: toggleLog };

  return (
    <div className="pb-28 lg:pb-0 lg:pl-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home {...homeProps} />} />
        <Route path="/:petId" element={<Home {...homeProps} />} />
        <Route path="/health" element={<Health />} />
        <Route path="/health/:petId" element={<Health />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:petId" element={<Calendar />} />
        <Route path="/more" element={<More />} />
        <Route path="/more/vaccine" element={<AddVaccine />} />
        <Route path="/more/event" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;