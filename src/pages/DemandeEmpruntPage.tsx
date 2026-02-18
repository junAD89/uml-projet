import { useState } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  Trash2,
  Pencil,
} from "lucide-react";

interface DemandeEmprunt {
  id: number;
  titreLivre: string;
  lecteur: string;
  dateCreation: string;
  dateEmpruntPrevue: string;
  status: string;
}

const demandesEmprunt: DemandeEmprunt[] = [
  {
    id: 1,
    titreLivre: "The Millionaire Mindset",
    lecteur: "Ahmed Hassan",
    dateCreation: "2024-02-15",
    dateEmpruntPrevue: "2024-02-20",
    status: "En attente",
  },
  {
    id: 2,
    titreLivre: "Clean Code",
    lecteur: "Marie Dupont",
    dateCreation: "2024-02-10",
    dateEmpruntPrevue: "2024-02-25",
    status: "Approuvée",
  },
  {
    id: 3,
    titreLivre: "The Art of War",
    lecteur: "Joanita Smith",
    dateCreation: "2024-02-05",
    dateEmpruntPrevue: "2024-02-18",
    status: "Rejetée",
  },
];

export default function DemandeEmpruntPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col p-6 gap-6">
      {/* Top section with search and buttons */}
      <div className="flex items-center gap-4">
        {/* Search section */}
        <div className="flex-1 flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
          <Search className="text-neutral-400" size={20} />
          <input
            className="bg-transparent outline-none flex-1 text-white placeholder-neutral-400"
            placeholder="Rechercher une demande..."
          />
        </div>

        {/* Buttons */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
          <Plus size={20} />
          Nouvelle demande
        </button>

        <button className="flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-6 py-2 rounded-full font-medium transition">
          <SlidersHorizontal size={20} />
          Trier
        </button>
      </div>

      {/* Table section */}
      <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-300 font-medium">
                Titre du livre
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Lecteur
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Date de création
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Date d'emprunt prévue
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
            {demandesEmprunt.map((demande) => (
              <tr
                key={demande.id}
                className="border-b border-neutral-700 hover:bg-[#2A2A2A] transition"
              >
                <td className="p-4 text-white">{demande.titreLivre}</td>
                <td className="p-4 text-white">{demande.lecteur}</td>
                <td className="p-4 text-white">{demande.dateCreation}</td>
                <td className="p-4 text-white">{demande.dateEmpruntPrevue}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      demande.status === "En attente"
                        ? "bg-yellow-600 text-white"
                        : demande.status === "Approuvée"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                    }`}
                  >
                    {demande.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === demande.id ? null : demande.id)
                      }
                      className="flex justify-center items-center text-neutral-400 hover:text-white transition p-2 hover:bg-[#3A3A3A] rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === demande.id && (
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
    </div>
  );
}
