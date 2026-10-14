import { useParams, NavLink, Link } from "react-router-dom";
import { usePets } from "./data/usePets.js";

const ICONS = { vaccine: "💉", vet: "🩺", treatment: "💊", grooming: "✂️" };

function toLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysFromToday(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ms = toLocalDate(dateString) - today;
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function relativeLabel(days) {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  return days < 0 ? `${Math.abs(days)} days ago` : `In ${days} days`;
}

function formatDate(dateString) {
  return toLocalDate(dateString).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function buildItems(pets, petId) {
  const allItems = Object.entries(pets).flatMap(([id, pet]) => {
    const vaccineItems = pet.health.vaccines.map((vaccine) => ({
      key: `vaccine-${id}-${vaccine.id}`,
      petId: id,
      petName: pet.name,
      type: "vaccine",
      title: `${vaccine.name} vaccine due`,
      date: vaccine.nextDue,
      time: null,
    }));

    const eventItems = pet.events.map((event) => ({
      ...event,
      key: `event-${id}-${event.id}`,
      petId: id,
      petName: pet.name,
    }));

    return [...vaccineItems, ...eventItems];
  });

  return allItems
    .filter((item) => !petId || item.petId === petId)
    .sort((a, b) => toLocalDate(a.date) - toLocalDate(b.date));
}

function CalendarItem({ item }) {
  const days = daysFromToday(item.date);

  return (
    <li className="flex items-start gap-3 border-t border-gray-200 py-3">
      <span className="text-xl" aria-hidden="true">{ICONS[item.type]}</span>
      <div className="flex-1 min-w-0">
        <p>{item.title}</p>
        <p className="text-xs text-gray-300">
          {item.petName} · {formatDate(item.date)}
          {item.time && ` · ${item.time}`}
        </p>
      </div>
      <span className={`text-sm shrink-0 ${days < 0 ? "text-red-300" : "text-gray-300"}`}>
        {relativeLabel(days)}
      </span>
    </li>
  );
}

function Group({ title, items }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <ul>
        {items.map((item) => (
          <CalendarItem key={item.key} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default function Calendar() {
  const { pets } = usePets();
  const { petId } = useParams();

  const chips = [
    { label: "All", to: "/calendar", end: true },
    ...Object.entries(pets).map(([id, p]) => ({ label: p.name, to: `/calendar/${id}` })),
  ];

  if (petId && !pets[petId]) {
    return <p className="p-4 text-white">Pet not found.</p>;
  }

  const items = buildItems(pets, petId);

  const overdue = items.filter((item) => daysFromToday(item.date) < 0);
  const thisWeek = items.filter((item) => {
    const days = daysFromToday(item.date);
    return days >= 0 && days <= 7;
  });
  const later = items.filter((item) => daysFromToday(item.date) > 7);

  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Calendar</h1>
        <Link
          to="/more/event"
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
        <Group title="Overdue" items={overdue} />
        <Group title="This week" items={thisWeek} />
        <Group title="Later" items={later} />

        {items.length === 0 && (
          <p className="text-sm text-gray-300">Nothing coming up.</p>
        )}
      </div>
    </div>
  );
}