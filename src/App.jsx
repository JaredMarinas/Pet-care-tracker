import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar.jsx";
import Home from "./Home.jsx";
import Health from "./Health.jsx";
import Calendar from "./Calendar.jsx";
import More from "./More.jsx";
import AddVaccine from "./AddVaccine.jsx";
import AddEvent from "./AddEvent.jsx";

function App() {
  return (
    <div className="pb-28 lg:pb-0 lg:pl-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:petId" element={<Home />} />
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