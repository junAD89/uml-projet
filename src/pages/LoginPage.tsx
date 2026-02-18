import { Toaster, toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation basique
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email invalide");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        adminEmail: email,
        adminPassword: password,
      });

      // Connexion réussie
      toast.success("Connecté avec succès !");

      // Stocker les informations de connexion dans localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        }),
      );

      window.location.reload(); // Rafraîchir la page pour mettre à jour l'état de connexion
      // Rediriger vers la page principale
      setTimeout(() => {
        navigate("/dash");
      }, 500);
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Toaster position="top-center" />
      <div className="login-card">
        <div className="login-header">
          <h1>Connexion</h1>
          <p>Accédez à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="login-footer">
          <p>Compte de test : test@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}
