import { useState } from "react";
import MatchCard from "../components/MatchCard";
import { matches as initialMatches } from "../data/mockData";

export default function Matches() {
  const [matches] = useState(initialMatches);

  const pending = matches.filter((m) => m.status === "PENDING");
  const accepted = matches.filter((m) => m.status === "ACCEPTED");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mis matches</h2>
        <p className="text-sm text-gray-500 mt-1">
          Conexiones generadas por el motor de matching semántico
        </p>
      </div>

      {/* Cómo funciona */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">⚙️ Cómo funciona el matching</p>
        <p>
          El motor TF-IDF analiza las descripciones y etiquetas de tus servicios y los compara con
          los servicios de otros usuarios cercanos. El score de compatibilidad (0–100%) refleja qué
          tan bien encajan las necesidades de ambas partes. En S5 se añaden embeddings semánticos
          para mejorar la precisión.
        </p>
      </div>

      {/* Pendientes */}
      {pending.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Pendientes de respuesta ({pending.length})
          </h3>
          <div className="flex flex-col gap-4">
            {pending.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Aceptados */}
      {accepted.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Aceptados — en curso ({accepted.length})
          </h3>
          <div className="flex flex-col gap-4">
            {accepted.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🤝</p>
          <p className="font-medium text-gray-600">Aún no tienes matches</p>
          <p className="text-sm mt-1">
            Crea un servicio y el sistema buscará automáticamente conexiones en tu comunidad.
          </p>
        </div>
      )}
    </div>
  );
}
