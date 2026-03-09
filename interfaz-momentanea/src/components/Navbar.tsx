import { NavLink } from "react-router-dom";
import { currentUser } from "../data/mockData";

const links = [
  { to: "/home", label: "Explorar", icon: "🔍" },
  { to: "/matches", label: "Matches", icon: "🤝" },
  { to: "/mis-servicios", label: "Mis servicios", icon: "📋" },
  { to: "/perfil", label: "Perfil", icon: "👤" },
];

export default function Navbar() {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col py-6 px-4 fixed left-0 top-0">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-emerald-600">Comunne</h1>
        <p className="text-xs text-gray-400 mt-0.5">Banco de tiempo local</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User mini-card */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{currentUser.name}</p>
            <p className="text-xs text-emerald-600 font-medium">{currentUser.time_balance} min</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
