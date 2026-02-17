import { Bell, Home, MessageCircle, Users2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface SideBarProps {
  onLogout?: () => void;
}

export default function SideBar({ onLogout }: SideBarProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className="w-64 bg-neutral-800 text-white p-6 flex flex-col">
      {/* Profile Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
            <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-500">A</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Afeli</h3>
            <p className="text-sm text-neutral-400">afeli@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-4">
        {/* Dashboard */}
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition"
        >
          <Home className="w-6 h-6 text-blue-500" />
          <span className="font-medium text-blue-500">Dashboard</span>
        </Link>

        {/* Adherant */}
        <Link
          to="/adherant"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition"
        >
          <Users2 className="w-6 h-6" />
          <span className="font-medium ">Adherant</span>
        </Link>

        {/* Demande D'emprunt */}
        <Link
          to="/demandes"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="font-medium text-white">Demande D'emprunt</span>
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition"
        >
          <Bell className="w-6 h-6 text-white" />
          <span className="font-medium text-white">Notifications</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-700 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 cursor-pointer transition text-left duration-200"
        >
          <LogOut className="w-6 h-6 text-red-500" />
          <span className="text-white font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
