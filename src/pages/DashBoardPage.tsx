import { OrbitProgress } from "react-loading-indicators";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Search,
  MoreVertical,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

interface Book {
  id: number;
  titre: string;
  auteur: string;
  categorie: string;
  status: string;
  emprunteur: string;
  penalite: string;
}

export default function DashBoardPage() {
  const [livresEmpruntés, setLivresEmpruntés] = useState<Book[]>([]);

  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchLivres = async () => {
    alert("fetching livres...");
    try {
      const response = await fetch(`${API_URL}/livres`);
      const data = await response.json();

      // Transformer les données du serveur avec des valeurs hardcodées pour les champs manquants
      const livresTransformés: Book[] = data.livres.map(
        (livre: any, index: number) => ({
          id: livre.id || index + 1,
          titre: livre.titre || "",
          auteur: livre.auteur || "",
          categorie: "self development",
          status: "Emprunte",
          emprunteur: "Joanita",
          penalite: "OUI",
        }),
      );

      setLivresEmpruntés(livresTransformés);
      alert("Livres fetched successfully!");
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
      alert(
        "Erreur lors de la récupération des livres. Vérifiez la console pour plus de détails.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLivres();
  }, []);

  return (
    <div className="w-full flex flex-col p-6 gap-6">
      {/* Cards section */}
      <div className="flex gap-6">
        {/* Card: total emprunts */}
        <div className="bg-[#2A2A2A] w-60 flex flex-col items-center justify-center p-6 rounded-[25px]">
          <h3 className="text-neutral-400 text-sm">Nombre d emprunt</h3>
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-bold text-white">34</h1>
            <ChevronRight className="text-neutral-400" />
          </div>
        </div>
        {/* Card: total livres */}
        <div className="bg-[#2A2A2A] w-60 flex flex-col items-center justify-center p-6 rounded-[25px]">
          <h3 className="text-neutral-400 text-sm">Nombre Total de Livre</h3>
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-bold text-white">84</h1>
            <ChevronRight className="text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Top section with search and buttons */}
      <div className="flex items-center gap-4">
        {/* Search section */}
        <div className="flex-1 flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
          <Search className="text-neutral-400" size={20} />
          <input
            className="bg-transparent outline-none flex-1 text-white placeholder-neutral-400"
            placeholder="Search"
          />
        </div>

        {/* Buttons */}
        <motion.button
          onClick={() => {
            fetchLivres();
          }}
          whileTap={{
            scale: 0.5,
          }}
          className="flex items-center gap-2 bg-[#424FCA] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition"
        >
          <RotateCcw size={20} />
          Rafraichir
        </motion.button>

        <button className="flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-6 py-2 rounded-full font-medium transition">
          <SlidersHorizontal size={20} />
          Sort
        </button>
      </div>

      {loading ? (
        <div>
          {/* Table section */}
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    Nom du livre
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    Auteur(es)
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    Categories
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    nom l'emprunteur
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium">
                    Penalite
                  </th>
                  <th className="text-left p-4 text-neutral-300 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {livresEmpruntés.map((livre) => (
                  <tr
                    key={livre.id}
                    className="border-b border-neutral-700 hover:bg-[#2A2A2A] transition"
                  >
                    <td className="p-4 text-white">{livre.titre}</td>
                    <td className="p-4 text-white">{livre.auteur}</td>
                    <td className="p-4 text-white">{livre.categorie}</td>
                    <td className="p-4">
                      <span className="bg-neutral-600 text-white px-4 py-1 rounded-full text-sm">
                        {livre.status}
                      </span>
                    </td>
                    <td className="p-4 text-white">{livre.emprunteur}</td>
                    <td className="p-4">
                      <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {livre.penalite}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-neutral-400 hover:text-white transition">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
      )}
    </div>
  );
}
