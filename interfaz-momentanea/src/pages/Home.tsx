import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/mockData";
import type { ServiceType } from "../data/mockData";

type Filter = "ALL" | ServiceType;

export default function Home() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) => {
    const matchType = filter === "ALL" || s.type === filter;
    const matchSearch =
      search === "" ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Explorar servicios</h2>
        <p className="text-sm text-gray-500 mt-1">Servicios disponibles en tu comunidad local</p>
      </div>

      {/* Mapa placeholder */}
      <div className="bg-gradient-to-br from-emerald-100 to-teal-200 rounded-xl h-40 flex items-center justify-center mb-6 border border-emerald-200">
        <div className="text-center">
          <p className="text-2xl mb-1">🗺️</p>
          <p className="text-sm font-medium text-emerald-800">Mapa de servicios locales</p>
          <p className="text-xs text-emerald-600 mt-0.5">
            Se integrará con PostGIS + Leaflet (Sprint S3)
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título o etiqueta..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-sm text-gray-400 hover:text-gray-600 px-2"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "OFFER", "REQUEST"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
              filter === f
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "ALL" ? "Todos" : f === "OFFER" ? "Ofertas" : "Demandas"}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid de servicios */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm">No hay servicios que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              actionLabel="Solicitar match"
              onAction={() => alert(`Match solicitado con ${service.user.name}.\n\nEn la versión real, el motor TF-IDF calculará el score de compatibilidad y lo mostrará en la sección Matches.`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
