import { usePets } from "./PetsContext.jsx";



const QUICK_LOGS = ["Treat", "Vomited", "Litter cleaned", "Medication"];

export default function TodayLogs({ petId, logs, onAdd, onToggle }) {
  const canAdd = Boolean(petId);
  const { pets } = usePets();

  const doneCount = logs.filter((log) => log.done).length;

  return (
    <section className="h-full rounded-2xl border border-zinc-800 bg-[#1c1c1e] text-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-lg font-semibold">Today</h2>
        <span className="text-xs text-gray-300">
          {doneCount} of {logs.length} done
        </span>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-300 py-3">
          {canAdd
            ? "Nothing logged yet. Tap a button below to add the first one."
            : "Nothing logged yet. Pick a pet to add a log."}
        </p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id} className="border-t border-gray-200">
              <button
                type="button"
                onClick={() => onToggle(log.id)}
                aria-pressed={log.done}
                className="flex items-center gap-3 w-full py-3 text-left min-h-11"
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-sm
                    ${log.done ? "bg-green-600 border-green-600 text-white" : "border-gray-400"}`}
                >
                  {log.done && "✓"}
                </span>

                <span className="flex-1 min-w-0">
                  <span className={log.done ? "" : "line-through text-gray-400"}>
                    {log.label}
                    {!petId && ` · ${pets[log.petId]?.name}`}
                  </span>
                  <span className="block text-xs text-gray-300">
                    {log.time} · {log.done ? `Logged by ${log.loggedBy}` : "Undone"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <div className="flex flex-wrap justify-evenly gap-2 mt-3 pt-3 border-t border-gray-200">
          {QUICK_LOGS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onAdd(petId, label)}
              className="text-xs px-3 py-2 rounded-full bg-transparent hover:bg-gray-600"
            >
              + {label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}