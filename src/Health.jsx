import { useParams, NavLink, Link } from "react-router-dom";
import { usePets } from "./data/usePets.js";

function toLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getStatus(nextDue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = Math.round((toLocalDate(nextDue) - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { label: `Overdue by ${Math.abs(daysLeft)} days`, color: "text-red-300" };
  }
  if (daysLeft <= 30) {
    return { label: `Due in ${daysLeft} days`, color: "text-amber-300" };
  }
  return { label: "Up to date", color: "text-green-300" };
}

function formatDate(dateString) {
  return toLocalDate(dateString).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function VaccineCard({ pet }) {
  const vaccines = [...pet.health.vaccines].sort(
    (a, b) => toLocalDate(a.nextDue) - toLocalDate(b.nextDue)
  );

  return (
    <section className="rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">{pet.name}: vaccinations</h2>
      <ul>
        {vaccines.map((vaccine) => {
          const status = getStatus(vaccine.nextDue);
          return (
            <li key={vaccine.id} className="border-t border-gray-200 py-3">
              <div className="flex justify-between gap-2">
                <span>{vaccine.name}</span>
                <span className={`text-sm ${status.color}`}>{status.label}</span>
              </div>
              <p className="text-xs text-gray-300">
                Given {formatDate(vaccine.given)} · Next due {formatDate(vaccine.nextDue)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Health() {
  const { pets } = usePets();
  const { petId } = useParams();

  const chips = [
    { label: "All", to: "/health", end: true },
    ...Object.entries(pets).map(([id, p]) => ({ label: p.name, to: `/health/${id}` })),
  ];

  if (petId && !pets[petId]) {
    return <p className="p-4 text-white">Pet not found.</p>;
  }

  const shownPets = petId ? [pets[petId]] : Object.values(pets);

  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Health</h1>
        <Link
          to="/more/vaccine"
          className="text-sm border border-gray-500 hover:bg-gray-600 rounded-3xl px-3 py-1"
        >
          + Add
        </Link>
      </div>

      <nav aria-label="Pets" className="flex flex-wrap gap-4 mb-4">
        {chips.map((chip) => (
          <NavLink
            key={chip.to}
            to={chip.to}
            end={chip.end}
            className={({ isActive }) =>
              `border py-2 px-4 rounded-3xl font-bold text-white ${
                isActive
                  ? "bg-green-600 border-green-600"
                  : "bg-transparent border-gray-500 hover:bg-gray-600"
              }`
            }
          >
            {chip.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-4">
        {shownPets.map((pet) => (
          <VaccineCard key={pet.name} pet={pet} />
        ))}
      </div>
    </div>
  );
}