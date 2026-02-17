import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashBoardPage from "./pages/DashBoardPage";
import AdherantPage from "./pages/AdherantPage";
import DemandeEmpruntPage from "./pages/DemandeEmpruntPage";
import NotificationsPage from "./pages/NotificationsPage";
import SideBar from "./components/sideBar";

function App() {
  return (
    <div className="flex min-h-screen bg-neutral-900">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 bg-black flex flex-col overflow-auto">
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/adherant" element={<AdherantPage />} />
          <Route path="/demandes" element={<DemandeEmpruntPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
