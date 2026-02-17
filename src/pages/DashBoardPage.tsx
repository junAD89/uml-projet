import { ChevronRight, Search } from "lucide-react";

export default function DashBoardPage() {
  return (
    <div className="w-full h-full flex flex-col p-6">
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
  );
}
