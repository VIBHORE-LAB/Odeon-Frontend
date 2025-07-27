import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/me";
import { LayoutDashboard, Music, Mic2, LogOut, User } from "lucide-react";
import logo from "../assets/logo.png";

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

export const Sidebar: React.FC = () => {
  const { data } = useQuery(GET_ME);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { label: "Top Songs", to: "/topsongs", icon: <Music size={20} /> },
    { label: "Top Artists", to: "/topartists", icon: <Mic2 size={20} /> },
  ];

  const handleLogout = () => console.log("logout");
  const me = data?.me;

  return (
    <aside
      className={[
        "group fixed left-0 top-0 h-screen z-40",
        "bg-black/40 backdrop-blur-md border-r border-gray-700",
        "text-white shadow-lg transition-all duration-300 ease-in-out",
        "w-16 hover:w-60",
        "flex flex-col justify-between",
      ].join(" ")}
    >
      <div className="relative flex items-center justify-center h-16 border-b border-gray-800">
        <img
          src={logo}
          alt="Odeon Logo"
          className="w-20 h-20 rounded-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-2xl font-extrabold tracking-wide text-green-400">
            Odeon
          </span>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto scrollbar-none">
        {navItems.map((item) => {
          const active = isActive(item.to);
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={[
                "group flex items-center w-full rounded-md px-3 py-2 transition-all duration-200",
                active
                  ? "bg-gray-800/60 text-green-400 shadow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/40",
              ].join(" ")}
              title={item.label}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="ml-3 text-sm font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile + Logout */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          {me?.image ? (
            <img
              src={me.image}
              alt={me?.display_name ?? "Profile"}
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center bg-gray-800">
              <User size={18} />
            </div>
          )}
          <div className="min-w-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm font-semibold truncate">
              {me?.display_name ?? "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{me?.email ?? ""}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-3 w-full flex items-center justify-start gap-2 rounded-md px-3 py-2 bg-gray-800/60 hover:bg-gray-800 transition-colors text-sm"
        >
          <span className="shrink-0">
            <LogOut size={16} />
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity truncate">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};
