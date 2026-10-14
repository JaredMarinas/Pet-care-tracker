import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePets } from "./data/usePets.js";

const inputClass =
  "w-full bg-[#1c1c1e] border border-gray-500 rounded-lg p-2 text-base text-white [color-scheme:dark]";

export default function AddEvent() {
  const { pets, addEvent } = usePets();
  const navigate = useNavigate();

  const [petId, setPetId] = useState(Object.keys(pets)[0]);
  const [type, setType] = useState("vet");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(petId, {
      type,
      title: title.trim(),
      date,
      time: time || null,
    });
    navigate(`/calendar/${petId}`);
  };

  return (
    <div className="p-4 text-white">
      <Link to="/more" className="text-sm underline hover:text-gray-300">← Back to More</Link>
      <h1 className="text-xl font-semibold mt-3 mb-4">Add calendar event</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="pet" className="block text-sm mb-1">Pet</label>
          <select id="pet" value={petId} onChange={(e) => setPetId(e.target.value)} className={inputClass}>
            {Object.entries(pets).map(([id, p]) => (
              <option key={id} value={id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm mb-1">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="vet">Vet visit</option>
            <option value="treatment">Treatment</option>
            <option value="grooming">Grooming</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm mb-1">What is it?</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Dental cleaning"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm mb-1">Date</label>
          <input id="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm mb-1">Time (optional)</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-500 font-bold py-3 rounded-3xl">
          Save event
        </button>
      </form>
    </div>
  );
}