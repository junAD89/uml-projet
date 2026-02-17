import { useState } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  Trash2,
  Pencil,
} from "lucide-react";

interface Adherant {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateAdhesion: string;
  status: string;
}

const adherants: Adherant[] = [
  {
    id: 1,
    nom: "Joanita Smith",
    email: "joanita@example.com",
    telephone: "+1 234 567 8900",
    adresse: "123 Main St, City",
    dateAdhesion: "2024-01-15",
    status: "Actif",
  },
  {
    id: 2,
    nom: "Marie Dupont",
    email: "marie.dupont@example.com",
    telephone: "+33 1 23 45 67 89",
    adresse: "456 Rue de Paris, France",
    dateAdhesion: "2024-02-10",
    status: "Actif",
  },
  {
    id: 3,
    nom: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    telephone: "+1 987 654 3210",
    adresse: "789 Oak Ave, Town",
    dateAdhesion: "2024-01-20",
    status: "Inactif",
  },
];

export default function AdherantPage() {
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
            placeholder="Rechercher un adhérant..."
          />
        </div>

        {/* Buttons */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
          <Plus size={20} />
          Ajouter adhérant
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
                Nom
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Email
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Téléphone
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Adresse
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Date d'adhésion
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
            {adherants.map((adherant) => (
              <tr
                key={adherant.id}
                className="border-b border-neutral-700 hover:bg-[#2A2A2A] transition"
              >
                <td className="p-4 text-white">{adherant.nom}</td>
                <td className="p-4 text-white">{adherant.email}</td>
                <td className="p-4 text-white">{adherant.telephone}</td>
                <td className="p-4 text-white">{adherant.adresse}</td>
                <td className="p-4 text-white">{adherant.dateAdhesion}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      adherant.status === "Actif"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {adherant.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === adherant.id ? null : adherant.id,
                        )
                      }
                      className="flex justify-center items-center text-neutral-400 hover:text-white transition p-2 hover:bg-[#3A3A3A] rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === adherant.id && (
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
