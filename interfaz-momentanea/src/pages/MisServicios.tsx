import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { myServices as initial, currentUser } from "../data/mockData";
import type { Service, ServiceType } from "../data/mockData";

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  duration_minutes: 60,
  type: "OFFER" as ServiceType,
};

export default function MisServicios() {
  const [services, setServices] = useState<Service[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    const newService: Service = {
      id: `new_${Date.now()}`,
      user: currentUser,
      type: form.type,
      title: form.title,
      description: form.description,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      duration_minutes: Number(form.duration_minutes),
    };

    setServices((prev) => [newService, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id: string) =>
    setServices((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis servicios</h2>
          <p className="text-sm text-gray-500 mt-1">
            Tus ofertas y demandas activas en Comunne
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {showForm ? "Cancelar" : "+ Nuevo servicio"}
        </button>
      </div>

      {/* Formulario de creación */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-emerald-200 rounded-xl p-5 mb-6 flex flex-col gap-4"
        >
          <h3 className="font-semibold text-gray-800">Nuevo servicio</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="OFFER">Ofrezco</option>
                <option value="REQUEST">Busco</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración (minutos)
              </label>
              <input
                name="duration_minutes"
                type="number"
                min={15}
                step={15}
                value={form.duration_minutes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ej: Clases de yoga para principiantes"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe qué ofreces o qué necesitas con el mayor detalle posible. El motor de matching usa este texto."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Etiquetas{" "}
              <span className="text-gray-400 font-normal">(separadas por coma)</span>
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="yoga, bienestar, principiantes"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            💡 El motor TF-IDF usará el título, descripción y etiquetas para encontrar matches
            compatibles en tu zona.
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Publicar servicio
          </button>
        </form>
      )}

      {/* Lista de servicios */}
      {services.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-medium text-gray-600">No tienes servicios aún</p>
          <p className="text-sm mt-1">Crea tu primer servicio para aparecer en el mapa.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              actionLabel="🗑 Eliminar"
              onAction={() => handleDelete(service.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
