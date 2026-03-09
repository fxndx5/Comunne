import { useState } from "react";
import { currentUser } from "../data/mockData";

const mockHistory = [
  { id: "t1", type: "earned", description: "Clases de Python con Carlos López", minutes: 90, date: "05/03/2026", rating: 5 },
  { id: "t2", type: "spent", description: "Masaje relajante con Sofía Ruiz", minutes: 45, date: "01/03/2026", rating: 5 },
  { id: "t3", type: "earned", description: "Ayuda con JavaScript a Ana Martínez", minutes: 60, date: "22/02/2026", rating: 4 },
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {"★".repeat(value)}{"☆".repeat(5 - value)}
    </span>
  );
}

export default function Perfil() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [savedBio, setSavedBio] = useState(currentUser.bio);

  const save = () => {
    setSavedBio(bio);
    setEditing(false);
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi perfil</h2>

      {/* Tarjeta de perfil */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
            {currentUser.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{currentUser.name}</h3>

            {editing ? (
              <div className="mt-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={save}
                    className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => { setBio(savedBio); setEditing(false); }}
                    className="text-sm border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 mt-1">
                <p className="text-sm text-gray-600 flex-1">{savedBio}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs text-emerald-600 hover:underline flex-shrink-0"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saldo y reputación */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
          <p className="text-2xl font-bold text-emerald-700">{currentUser.time_balance}</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">Minutos disponibles</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-800">{currentUser.reputation_as_provider.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Reputación como proveedor</p>
          <StarRating value={Math.round(currentUser.reputation_as_provider)} />
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-800">{currentUser.reputation_as_requester.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Reputación como solicitante</p>
          <StarRating value={Math.round(currentUser.reputation_as_requester)} />
        </div>
      </div>

      {/* Info reputación dual */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">⭐ Sistema de reputación dual</p>
        <p>
          Comunne mantiene dos reputaciones separadas: una como <strong>proveedor</strong> (cuando
          tú das el servicio) y otra como <strong>solicitante</strong> (cuando recibes el servicio).
          Ambas se actualizan automáticamente tras completar una transacción. (Sprint S6)
        </p>
      </div>

      {/* Historial de transacciones */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Historial de intercambios
        </h3>
        <div className="flex flex-col gap-3">
          {mockHistory.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  t.type === "earned"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type === "earned" ? "+" : "−"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating value={t.rating} />
                  <span className="text-xs text-gray-400">{t.date}</span>
                </div>
              </div>
              <span
                className={`text-sm font-semibold flex-shrink-0 ${
                  t.type === "earned" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {t.type === "earned" ? "+" : "−"}
                {t.minutes} min
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
