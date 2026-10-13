import { Link } from "react-router-dom";

export default function Tile({ title, to, className = "", children }) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-[#1c1c1e] p-4 text-white ${className}`}
    >
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {to && (
          <Link to={to} className="text-xs text-gray-300 underline hover:text-white">
            View all
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}