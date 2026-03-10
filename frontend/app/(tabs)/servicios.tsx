import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ServiceCard from "../../components/ServiceCard";
import { colors } from "../../constants/colors";
import { currentUser, myServices as initialServices } from "../../data/mockData";
import type { Service, ServiceType } from "../../data/mockData";

const empty = { title: "", description: "", tags: "", duration_minutes: "60", type: "OFFER" as ServiceType };

export default function ServiciosScreen() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);

  const submit = () => {
    if (!form.title || !form.description) return;
    const newS: Service = {
      id: `new_${Date.now()}`,
      user: currentUser,
      type: form.type,
      title: form.title,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      duration_minutes: Number(form.duration_minutes) || 60,
    };
    setServices((prev) => [newS, ...prev]);
    setForm(empty);
    setShowForm(false);
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>Mis servicios</Text>
                <Text style={styles.subtitle}>Tus ofertas y demandas activas</Text>
              </View>
              <TouchableOpacity
                style={[styles.newBtn, showForm && styles.newBtnCancel]}
                onPress={() => setShowForm((v) => !v)}
              >
                <Text style={styles.newBtnText}>{showForm ? "Cancelar" : "+ Nuevo"}</Text>
              </TouchableOpacity>
            </View>

            {/* Formulario */}
            {showForm && (
              <View style={styles.form}>
                <Text style={styles.formTitle}>Nuevo servicio</Text>

                {/* Tipo */}
                <View style={styles.typeRow}>
                  {(["OFFER", "REQUEST"] as ServiceType[]).map((t) => (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setForm({ ...form, type: t })}
                      style={[styles.typeBtn, form.type === t && styles.typeBtnActive]}
                    >
                      <Text style={[styles.typeBtnText, form.type === t && styles.typeBtnTextActive]}>
                        {t === "OFFER" ? "Ofrezco" : "Busco"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Título</Text>
                <TextInput
                  value={form.title}
                  onChangeText={(v) => setForm({ ...form, title: v })}
                  placeholder="Ej: Clases de yoga para principiantes"
                  placeholderTextColor="#666"
                  style={styles.input}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  value={form.description}
                  onChangeText={(v) => setForm({ ...form, description: v })}
                  placeholder="Describe qué ofreces o qué necesitas. El motor TF-IDF usa este texto para el matching."
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={3}
                  style={[styles.input, styles.inputMultiline]}
                />

                <Text style={styles.label}>Etiquetas (separadas por coma)</Text>
                <TextInput
                  value={form.tags}
                  onChangeText={(v) => setForm({ ...form, tags: v })}
                  placeholder="yoga, bienestar, principiantes"
                  placeholderTextColor="#666"
                  style={styles.input}
                />

                <Text style={styles.label}>Duración (minutos)</Text>
                <TextInput
                  value={form.duration_minutes}
                  onChangeText={(v) => setForm({ ...form, duration_minutes: v })}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholderTextColor="#666"
                />

                <View style={styles.hint}>
                  <Text style={styles.hintText}>
                    💡 El motor TF-IDF usará el título, descripción y etiquetas para encontrar matches compatibles en tu zona.
                  </Text>
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={submit}>
                  <Text style={styles.submitBtnText}>Publicar servicio</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            actionLabel="🗑 Eliminar"
            onAction={() => setServices((prev) => prev.filter((s) => s.id !== item.id))}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>No tienes servicios aún</Text>
            <Text style={styles.emptyText}>Crea tu primer servicio para aparecer en el mapa.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingTop: 56 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 4 },
  subtitle: { color: "#888", fontSize: 13 },
  newBtn: { backgroundColor: colors.secondary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  newBtnCancel: { backgroundColor: colors.l_background },
  newBtnText: { color: colors.background, fontWeight: "700", fontSize: 13 },
  form: { backgroundColor: colors.d_background, borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.secondary + "40" },
  formTitle: { color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 14 },
  typeRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  typeBtn: { flex: 1, borderWidth: 1, borderColor: colors.l_background, borderRadius: 10, paddingVertical: 8, alignItems: "center" },
  typeBtnActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  typeBtnText: { color: "#aaa", fontWeight: "600", fontSize: 13 },
  typeBtnTextActive: { color: colors.background },
  label: { color: colors.text, fontSize: 13, fontWeight: "600", marginBottom: 6, marginTop: 4 },
  input: { backgroundColor: colors.l_background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: colors.text, fontSize: 14, marginBottom: 4, borderWidth: 1, borderColor: "#555" },
  inputMultiline: { minHeight: 70, textAlignVertical: "top" },
  hint: { backgroundColor: "#f59e0b18", borderWidth: 1, borderColor: "#f59e0b44", borderRadius: 10, padding: 10, marginVertical: 10 },
  hintText: { color: "#f59e0b", fontSize: 12 },
  submitBtn: { backgroundColor: colors.secondary, borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 4 },
  submitBtnText: { color: colors.background, fontWeight: "700", fontSize: 14 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyText: { color: "#888", fontSize: 13, textAlign: "center" },
});
