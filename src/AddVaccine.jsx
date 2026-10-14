import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePets } from "./data/usePets.js";

const inputClass =
  "w-full bg-[#1c1c1e] border border-gray-500 rounded-lg p-2 text-base text-white [color-scheme:dark]";

export default function AddVaccine() {
  const { pets, addVaccine } = usePets();
  const navigate = useNavigate();

  const [petId, setPetId] = useState(Object.keys(pets)[0]);
  const [name, setName] = useState("");
  const [given, setGiven] = useState("");
  const [nextDue, setNextDue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVaccine(petId, { name: name.trim(), given, nextDue });
    navigate(`/health/${petId}`);
  };

  return (
    <div className="p-4 text-white">
      <Link to="/more" className="text-sm underline hover:text-gray-300">← Back to More</Link>
      <h1 className="text-xl font-semibold mt-3 mb-4">Add vaccine</h1>

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
          <label htmlFor="name" className="block text-sm mb-1">Vaccine name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rabies"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="given" className="block text-sm mb-1">Date given</label>
          <input id="given" type="date" required value={given} onChange={(e) => setGiven(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="nextDue" className="block text-sm mb-1">Next due</label>
          <input id="nextDue" type="date" required min={given} value={nextDue} onChange={(e) => setNextDue(e.target.value)} className={inputClass} />
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-500 font-bold py-3 rounded-3xl">
          Save vaccine
        </button>
      </form>
    </div>
  );
}