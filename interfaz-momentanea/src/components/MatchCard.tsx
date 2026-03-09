import { useState } from "react";
import type { Match } from "../data/mockData";

interface Props {
  match: Match;
}

const statusLabel: Record<Match["status"], string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptado",
  REJECTED: "Rechazado",
};

const statusColor: Record<Match["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function MatchCard({ match }: Props) {
  const [status, setStatus] = useState<Match["status"]>(match.status);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const scorePercent = Math.round(match.score * 100);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "Tú", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: match.offer.user.name, text: "¡Genial! ¿Cuándo te va bien?" },
      ]);
    }, 800);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header del match */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-gray-500">
              Compatibilidad: {scorePercent}%
            </span>
            {/* Barra de score */}
            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[status]}`}>
            {statusLabel[status]}
          </span>
        </div>
      </div>

      {/* Servicios implicados */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {/* Oferta */}
        <div className="bg-emerald-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-emerald-600 mb-1">Ofrece</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold">
              {match.offer.user.avatar}
            </div>
            <p className="text-xs text-gray-600 font-medium">{match.offer.user.name}</p>
          </div>
          <p className="text-sm font-medium text-gray-800">{match.offer.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">⏱ {match.offer.duration_minutes} min</p>
        </div>

        {/* Demanda */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-600 mb-1">Busca</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold">
              {match.request.user.avatar}
            </div>
            <p className="text-xs text-gray-600 font-medium">{match.request.user.name}</p>
          </div>
          <p className="text-sm font-medium text-gray-800">{match.request.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">⏱ {match.request.duration_minutes} min</p>
        </div>
      </div>

      {/* Acciones */}
      {status === "PENDING" && (
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={() => setStatus("ACCEPTED")}
            className="flex-1 text-sm font-medium bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={() => setStatus("REJECTED")}
            className="flex-1 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            Rechazar
          </button>
        </div>
      )}

      {status === "ACCEPTED" && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setChatOpen((o) => !o)}
            className="w-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg py-2 hover:bg-blue-100 transition-colors"
          >
            {chatOpen ? "Cerrar chat" : "💬 Abrir chat"}
          </button>

          {chatOpen && (
            <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-36 overflow-y-auto p-3 bg-gray-50 flex flex-col gap-2">
                {messages.length === 0 && (
                  <p className="text-xs text-gray-400 text-center mt-8">
                    Empieza la conversación para coordinar el intercambio.
                  </p>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.from === "Tú" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`text-xs px-3 py-1.5 rounded-xl max-w-[75%] ${
                        m.from === "Tú"
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex border-t border-gray-200">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 text-sm px-3 py-2 outline-none"
                />
                <button
                  onClick={send}
                  className="px-4 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
