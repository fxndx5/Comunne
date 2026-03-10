import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ServiceCard from "../../components/ServiceCard";
import { colors } from "../../constants/colors";
import { services } from "../../data/mockData";
import type { ServiceType } from "../../data/mockData";

type Filter = "ALL" | ServiceType;

export default function ExplorarScreen() {
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
    <View style={styles.page}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <Text style={styles.title}>Explorar servicios</Text>
            <Text style={styles.subtitle}>Servicios disponibles en tu comunidad local</Text>

            {/* Mapa placeholder */}
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapEmoji}>🗺️</Text>
              <Text style={styles.mapTitle}>Mapa de servicios locales</Text>
              <Text style={styles.mapSub}>PostGIS + Leaflet (Sprint S3)</Text>
            </View>

            {/* Buscador */}
            <View style={styles.searchBox}>
              <Feather name="search" size={16} color="#666" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar por título o etiqueta..."
                placeholderTextColor="#666"
                style={styles.searchInput}
              />
            </View>

            {/* Filtros */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
              {(["ALL", "OFFER", "REQUEST"] as Filter[]).map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
                >
                  <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                    {f === "ALL" ? "Todos" : f === "OFFER" ? "Ofertas" : "Demandas"}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.resultsCount}>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            actionLabel="Solicitar match"
            onAction={() => alert(`Match solicitado con ${item.user.name}.\nEl motor TF-IDF calculará el score de compatibilidad.`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No hay servicios que coincidan.</Text>
          </View>
        }
      />
    </View>
  );
}

// Import local para Feather dentro del componente de cabecera
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingTop: 56 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 4 },
  subtitle: { color: "#888", fontSize: 13, marginBottom: 16 },
  mapPlaceholder: { backgroundColor: colors.d_background, borderRadius: 14, height: 120, alignItems: "center", justifyContent: "center", marginBottom: 16, borderWidth: 1, borderColor: colors.l_background },
  mapEmoji: { fontSize: 28, marginBottom: 4 },
  mapTitle: { color: colors.primary, fontWeight: "700", fontSize: 14 },
  mapSub: { color: "#888", fontSize: 12, marginTop: 2 },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: colors.d_background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: colors.l_background, marginBottom: 12, gap: 8 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  filters: { marginBottom: 12 },
  filterBtn: { backgroundColor: colors.d_background, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, marginRight: 8, borderWidth: 1, borderColor: colors.l_background },
  filterBtnActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  filterText: { color: "#aaa", fontSize: 13, fontWeight: "600" },
  filterTextActive: { color: colors.background },
  resultsCount: { color: "#888", fontSize: 12, marginBottom: 12 },
  empty: { alignItems: "center", paddingTop: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: { color: "#666", fontSize: 14 },
});
