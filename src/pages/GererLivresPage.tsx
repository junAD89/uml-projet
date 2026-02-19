import { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  Trash2,
  Pencil,
} from "lucide-react";
import { OrbitProgress } from "react-loading-indicators";

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  categorie: string;
  isbn: string;
  editeur: string;
  status: string;
}

export default function GérerLivresPage() {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("tous");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchLivres = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/livres`);
      const data = await response.json();

      const livresTransformés: Livre[] = data.livres.map(
        (livre: any, index: number) => ({
          id: livre.id || index + 1,
          titre: livre.titre || "",
          auteur: livre.auteur || "",
          categorie: "Non spécifiée",
          isbn: "ISBN-" + (livre.id || index),
          editeur: "Éditeur inconnu",
          status: "Disponible",
        }),
      );

      setLivres(livresTransformés);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivres();
  }, []);

  const filteredLivres = livres.filter((livre) => {
    if (filterStatus === "tous") return true;
    return livre.status === filterStatus;
  });

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-6 min-h-screen">
        <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 gap-6">
      {/* Top section with search and buttons */}
      <div className="flex items-center gap-4">
        {/* Search section */}
        <div className="flex-1 flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
          <Search className="text-neutral-400" size={20} />
          <input
            className="bg-transparent outline-none flex-1 text-white placeholder-neutral-400"
            placeholder="Rechercher un livre..."
          />
        </div>

        {/* Buttons */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
          <Plus size={20} />
          Ajouter un livre
        </button>

        {/* Dropdown Filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-6 py-2 rounded-full font-medium transition cursor-pointer appearance-none pr-10"
          >
            <option value="tous">Tous les statuts</option>
            <option value="Disponible">Disponible</option>
            <option value="Emprunté">Emprunté</option>
            <option value="En réparation">En réparation</option>
          </select>
          <SlidersHorizontal
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Table section */}
      <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-300 font-medium">
                Titre
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Auteur
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Catégorie
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                ISBN
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Éditeur
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Status
              </th>
              <th className="text-center p-4 text-neutral-300 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLivres.map((livre) => (
              <tr
                key={livre.id}
                className="border-b border-neutral-700 hover:bg-[#2A2A2A] transition"
              >
                <td className="p-4 text-white">{livre.titre}</td>
                <td className="p-4 text-white">{livre.auteur}</td>
                <td className="p-4 text-white">{livre.categorie}</td>
                <td className="p-4 text-white">{livre.isbn}</td>
                <td className="p-4 text-white">{livre.editeur}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      livre.status === "Disponible"
                        ? "bg-green-600 text-white"
                        : livre.status === "Emprunté"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"
                    }`}
                  >
                    {livre.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === livre.id ? null : livre.id)
                      }
                      className="flex justify-center items-center text-neutral-400 hover:text-white transition p-2 hover:bg-[#3A3A3A] rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === livre.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-[#2A2A2A] rounded-lg shadow-lg border border-neutral-700 z-50">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3A3A3A] border-b border-neutral-700 transition">
                          <Pencil size={16} className="text-blue-400" />
                          <span className="text-sm font-medium">Editer</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3A3A3A] transition">
                          <Trash2 size={16} className="text-red-400" />
                          <span className="text-sm font-medium">Supprimer</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLivres.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400 text-lg">
            Aucun livre trouvé pour le filtre sélectionné
          </p>
        </div>
      )}
    </div>
  );
}
