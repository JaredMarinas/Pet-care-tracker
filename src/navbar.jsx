import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const isHealth = pathname.startsWith("/health");
  const isCalendar = pathname.startsWith("/calendar");

  const isMore = pathname.startsWith("/more");
  const isToday = !isHealth && !isCalendar && !isMore;

  const tabClass = (active) =>
    `flex flex-col items-center transition-colors ${
      active ? "text-blue-500 hover:text-blue-400" : "hover:text-gray-200"
    }`;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 w-full bg-[#1c1c1e] border-t border-zinc-800 text-gray-400 px-4 py-2 pb-6 z-50 lg:top-0 lg:bottom-auto lg:h-screen lg:w-24 lg:border-t-0 lg:border-r lg:px-2 lg:py-6"
    >
      <div className="flex justify-between items-center max-w-md mx-auto lg:flex-col lg:justify-start lg:gap-8 lg:max-w-none">

        <Link
          to="/"
          className={tabClass(isToday)}
          aria-current={isToday ? "page" : undefined}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Today</span>
        </Link>

        <Link
          to="/health"
          className={tabClass(isHealth)}
          aria-current={isHealth ? "page" : undefined}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h2l1-3 2 6 1-3h2" />
          </svg>
          <span className="text-xs font-medium">Health</span>
        </Link>

        <Link
          to="/calendar"
          className={tabClass(isCalendar)}
          aria-current={isCalendar ? "page" : undefined}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M12 14v4" strokeLinecap="round"></path>
            <path d="M10 14h2" strokeLinecap="round"></path>
          </svg>
          <span className="text-xs font-medium">Calendar</span>
        </Link>

        <Link
          to="/more"
          className={tabClass(isMore)}
          aria-current={isMore ? "page" : undefined}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="19" cy="12" r="1.5"></circle>
            <circle cx="5" cy="12" r="1.5"></circle>
          </svg>
          <span className="text-xs font-medium">More</span>
        </Link>
      </div>
    </nav>
  );
}