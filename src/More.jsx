import { Link } from "react-router-dom";

const groups = [
  {
    title: "Pets",
    rows: [
      { icon: "🐾", title: "Add a pet", description: "Create a profile for a new pet" },
      { icon: "✏️", title: "Edit pet details", description: "Update weight, vet, allergies, and notes" },
      { icon: "🔗", title: "Sitter link", description: "Share feeding notes, meds, and vet contact" },
    ],
  },
  {
    title: "Household",
    rows: [
      { icon: "👤", title: "Your profile", description: "Your name, shown on every log you add" },
      { icon: "👨‍👩‍👧", title: "Household members", description: "Invite family so everyone can log care" },
    ],
  },
  {
    title: "App",
    rows: [
      { icon: "🔔", title: "Reminders", description: "Vaccines, treatments, and medications" },
      { icon: "⚙️", title: "Preferences", description: "Units, date format, and theme" },
      { icon: "📄", title: "Export records", description: "Download a vet-ready summary as PDF or CSV" },
    ],
  },
  {
    title: "Support",
    rows: [
      { icon: "💬", title: "Help and feedback", description: "Questions, bugs, and ideas" },
      { icon: "ℹ️", title: "About", description: "Version, privacy policy, and terms" },
    ],
  },
];

function Row({ row }) {
  const content = (
    <>
      <span className="text-xl" aria-hidden="true">{row.icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block">{row.title}</span>
        <span className="block text-xs text-gray-300">{row.description}</span>
      </span>
      {row.to ? (
        <span aria-hidden="true">›</span>
      ) : (
        <span className="text-xs border border-gray-500 rounded-full px-2 py-0.5 text-gray-300">
          Soon
        </span>
      )}
    </>
  );

  const rowClass = "flex items-center gap-3 py-3";

  return (
    <li className="border-t border-gray-200 first:border-t-0">
      {row.to ? (
        <Link to={row.to} className={`${rowClass} hover:bg-gray-600`}>
          {content}
        </Link>
      ) : (
        <div className={`${rowClass} opacity-60`}>{content}</div>
      )}
    </li>
  );
}

export default function More() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold mb-4">More</h1>

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-sm text-gray-300 mb-2">{group.title}</h2>
            <ul className="rounded-lg shadow-md px-4">
              {group.rows.map((row) => (
                <Row key={row.title} row={row} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}