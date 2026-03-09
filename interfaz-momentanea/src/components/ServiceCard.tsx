import type { Service } from "../data/mockData";

interface Props {
  service: Service;
  onAction?: () => void;
  actionLabel?: string;
}

export default function ServiceCard({ service, onAction, actionLabel }: Props) {
  const isOffer = service.type === "OFFER";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {service.user.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{service.user.name}</p>
            <p className="text-xs text-gray-400">{service.user.distance_km} km · ⭐ {service.user.reputation_as_provider.toFixed(1)}</p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
            isOffer
              ? "bg-emerald-100 text-emerald-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isOffer ? "Ofrece" : "Busca"}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>

      {/* Tags + duration */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {service.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
          ⏱ {service.duration_minutes} min
        </span>
      </div>

      {/* Action */}
      {onAction && (
        <button
          onClick={onAction}
          className="mt-3 w-full text-sm font-medium text-emerald-700 border border-emerald-300 rounded-lg py-1.5 hover:bg-emerald-50 transition-colors"
        >
          {actionLabel ?? "Ver más"}
        </button>
      )}
    </div>
  );
}
