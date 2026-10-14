import { useParams } from "react-router-dom";
import { usePets } from "./data/usePets.js";
import NavButton from "./navbutton.jsx";
import Profile from "./profile.jsx";
import TodayLogs from "./TodayLogs.jsx";
import Tile from "./Tile.jsx";
import { buildItems, daysFromToday, relativeLabel, formatDate, ICONS } from "./utils/calendar.js";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#1c1c1e] p-4 text-white flex flex-col justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <span className="text-4xl font-semibold">{value}</span>
    </div>
  );
}

function Row({ item, rightClass = "text-gray-300" }) {
  const days = daysFromToday(item.date);
  return (
    <li className="flex items-start gap-3 border-t border-zinc-800 py-2 first:border-t-0">
      <span aria-hidden="true">{ICONS[item.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="truncate">{item.title}</p>
        <p className="text-xs text-gray-300">
          {item.petName} · {formatDate(item.date)}
        </p>
      </div>
      <span className={`text-sm shrink-0 ${rightClass}`}>{relativeLabel(days)}</span>
    </li>
  );
}

function vaccineColor(date) {
  const days = daysFromToday(date);
  if (days < 0) return "text-red-300";
  if (days <= 30) return "text-amber-300";
  return "text-green-300";
}

export default function Home() {
  const { pets, logs, addLog, toggleLog } = usePets();
  const { petId } = useParams();
  const pet = pets[petId];

  if (petId && !pet) {
    return (
      <div className="p-4">
        <NavButton />
        <p className="text-white">Pet not found.</p>
      </div>
    );
  }

  const shownPets = petId ? [pet] : Object.values(pets);
  const visibleLogs = petId ? logs.filter((log) => log.petId === petId) : logs;

  const items = buildItems(pets, petId);
  const vaccines = items.filter((item) => item.type === "vaccine");
  const events = items.filter(
    (item) => item.type !== "vaccine" && daysFromToday(item.date) >= 0
  );
  const overdueCount = vaccines.filter((item) => daysFromToday(item.date) < 0).length;
  const loggedCount = visibleLogs.filter((log) => log.done).length;

  return (
    <div className="p-4 mx-auto max-w-6xl">
      <NavButton />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:auto-rows-[minmax(9rem,auto)]">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {shownPets.map((p) => (
            <Profile key={p.name} pet={p} />
          ))}
        </div>

        <div className="lg:col-span-2 lg:row-span-2">
         <TodayLogs
            petId={petId}
            logs={visibleLogs}
            onAdd={addLog}
            onToggle={toggleLog}
          />
        </div>

        <Stat label="Logged today" value={loggedCount} />
        <Stat label="Overdue vaccines" value={overdueCount} />

        <Tile
          title="Upcoming"
          to={petId ? `/calendar/${petId}` : "/calendar"}
          className="lg:col-span-2"
        >
          {events.length === 0 ? (
            <p className="text-sm text-gray-300">Nothing scheduled.</p>
          ) : (
            <ul>
              {events.slice(0, 4).map((item) => (
                <Row key={item.key} item={item} />
              ))}
            </ul>
          )}
        </Tile>

        <Tile
          title="Vaccines"
          to={petId ? `/health/${petId}` : "/health"}
          className="lg:col-span-2"
        >
          {vaccines.length === 0 ? (
            <p className="text-sm text-gray-300">No vaccines recorded.</p>
          ) : (
            <ul>
              {vaccines.slice(0, 4).map((item) => (
                <Row key={item.key} item={item} rightClass={vaccineColor(item.date)} />
              ))}
            </ul>
          )}
        </Tile>
      </div>
    </div>
  );
}