import { useState } from "react";
import { Search, MoreVertical, Trash2, SlidersHorizontal } from "lucide-react";

interface Notification {
  id: number;
  titre: string;
  message: string;
  date: string;
  type: string;
  lue: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    titre: "Emprunt approuvé",
    message: "Votre demande d'emprunt de 'Clean Code' a été approuvée",
    date: "2024-02-15",
    type: "Succès",
    lue: false,
  },
  {
    id: 2,
    titre: "Retard de retour",
    message: "Attention : Vous avez un livre en retard à retourner",
    date: "2024-02-14",
    type: "Alerte",
    lue: false,
  },
  {
    id: 3,
    titre: "Rappel de retour",
    message: "Rappel : Vous devez retourner 'The Millionaire' dans 3 jours",
    date: "2024-02-13",
    type: "Info",
    lue: true,
  },
  {
    id: 4,
    titre: "Nouveau livre disponible",
    message: "Un nouveau livre dans votre catégorie préférée est disponible",
    date: "2024-02-12",
    type: "Info",
    lue: true,
  },
];

export default function NotificationsPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col p-6 gap-6">
      {/* Top section with search and filter */}
      <div className="flex items-center gap-4">
        {/* Search section */}
        <div className="flex-1 flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
          <Search className="text-neutral-400" size={20} />
          <input
            className="bg-transparent outline-none flex-1 text-white placeholder-neutral-400"
            placeholder="Rechercher une notification..."
          />
        </div>

        {/* Filter button */}
        <button className="flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-6 py-2 rounded-full font-medium transition">
          <SlidersHorizontal size={20} />
          Filtrer
        </button>
      </div>

      {/* Notifications section */}
      <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-300 font-medium">
                Statut
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Titre
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Message
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Type
              </th>
              <th className="text-left p-4 text-neutral-300 font-medium">
                Date
              </th>
              <th className="text-center p-4 text-neutral-300 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr
                key={notification.id}
                className={`border-b border-neutral-700 hover:bg-[#2A2A2A] transition ${
                  !notification.lue ? "bg-[#1F1F1F]" : ""
                }`}
              >
                <td className="p-4">
                  <span
                    className={`w-3 h-3 rounded-full inline-block ${
                      notification.lue ? "bg-neutral-600" : "bg-blue-500"
                    }`}
                  ></span>
                </td>
                <td className="p-4 text-white font-medium">
                  {notification.titre}
                </td>
                <td className="p-4 text-neutral-300">{notification.message}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      notification.type === "Succès"
                        ? "bg-green-600 text-white"
                        : notification.type === "Alerte"
                          ? "bg-orange-600 text-white"
                          : "bg-blue-600 text-white"
                    }`}
                  >
                    {notification.type}
                  </span>
                </td>
                <td className="p-4 text-neutral-400 text-sm">
                  {notification.date}
                </td>
                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === notification.id ? null : notification.id,
                        )
                      }
                      className="flex justify-center items-center text-neutral-400 hover:text-white transition p-2 hover:bg-[#3A3A3A] rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === notification.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-[#2A2A2A] rounded-lg shadow-lg border border-neutral-700 z-50">
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
