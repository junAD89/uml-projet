import {
  Bell,
  ChevronRight,
  Home,
  MessageCircle,
  Search,
  Users2,
} from "lucide-react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen bg-neutral-900">
      {/* Sidebar */}
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
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition">
            <Home className="w-6 h-6 text-blue-500" />
            <span className="font-medium text-blue-500">Dashboard</span>
          </div>

          {/* Adherant */}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition">
            <Users2 className="w-6 h-6" />
            <span className="font-medium ">Adherant</span>
          </div>

          {/* Demande D'emprunt */}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="font-medium text-white">Demande D'emprunt</span>
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition">
            <Bell className="w-6 h-6 text-white" />
            <span className="font-medium text-white">Notifications</span>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-700 pt-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 cursor-pointer transition text-left">
            <span className="text-white font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-black flex flex-col">
        <div className="flex-1 p-6">
          {/* Cards section */}
          <div className="flex gap-6">
            {/* Card: total emprunts */}
            <div className="bg-[#1E1E1E] w-60 flex flex-col items-center justify-center p-6 rounded-[25px]">
              <h3>nombre total d'emprunt</h3>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">34</h1>
                <ChevronRight />
              </div>
            </div>
            {/* Card: total livres */}
            <div className="bg-[#1E1E1E] w-60 flex flex-col items-center justify-center p-6 rounded-[25px]">
              <h3>Nombre total de livre</h3>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">84</h1>
                <ChevronRight />
              </div>
            </div>
          </div>

          {/* Search section */}
          <section className="mt-10">
            <div className="flex items-center gap-3 bg-[#1e1e1e] p-4 rounded-lg">
              <Search className="text-neutral-400" />
              <input
                className="bg-transparent outline-none flex-1 text-white placeholder-neutral-400"
                placeholder="Search"
              />
            </div>
          </section>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mt-10">
            Welcome to Dashboard
          </h1>
        </div>
      </main>
    </div>
  );
}

export default App;
