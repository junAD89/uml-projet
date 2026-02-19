import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashBoardPage from "./pages/DashBoardPage";
import AdherantPage from "./pages/AdherantPage";
import DemandeEmpruntPage from "./pages/DemandeEmpruntPage";
import NotificationsPage from "./pages/NotificationsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SideBar from "./components/sideBar";
import GérerLivresPage from "./pages/GererLivresPage";

interface User {
  email: string;
  isAuthenticated: boolean;
  loginTime: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement de l'app
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData: User = JSON.parse(user);
        if (userData.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, afficher la page de connexion
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Si l'utilisateur est authentifié, afficher l'app principale
  return (
    <div className="flex min-h-screen bg-neutral-900">
      {/* Sidebar */}
      <SideBar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 bg-black flex flex-col overflow-auto">
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/adherant" element={<AdherantPage />} />
          <Route path="/livres" element={<GérerLivresPage />} />
          <Route path="/demandes" element={<DemandeEmpruntPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
