import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ServiceCard from "../../components/ServiceCard";
import { colors } from "../../constants/colors";
import { services } from "../../data/mockData";

const RADII = [1, 5, 10, 25];

export default function MapaScreen() {
  const [radius, setRadius] = useState(5);
  const [filter, setFilter] = useState<"ALL" | "OFFER" | "REQUEST">("ALL");

  const filtered = services.filter(s => {
    const inRadius = s.user.distance_km <= radius;
    const matchType = filter === "ALL" || s.type === filter;
    return inRadius && matchType;
  });

  return (
    <View style={styles.page}>
      <FlatList
        data={filtered}
        keyExtractor={s => s.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Mapa</Text>
            <Text style={styles.subtitle}>Servicios cerca de ti</Text>

            {/* Mapa placeholder */}
            <View style={styles.mapBox}>
              <View style={styles.mapPin}>
                <Text style={styles.mapPinEmoji}>📍</Text>
              </View>
              {/* Puntos simulados */}
              {[{ top: "30%", left: "20%", color: colors.secondary }, { top: "55%", left: "65%", color: colors.primary }, { top: "20%", left: "70%", color: colors.secondary }, { top: "70%", left: "35%", color: colors.error }].map((p, i) => (
                <View key={i} style={[styles.dot, { top: p.top as any, left: p.left as any, backgroundColor: p.color }]} />
              ))}
              <View style={styles.mapOverlay}>
                <Text style={styles.mapLabel}>Mapa interactivo</Text>
                <Text style={styles.mapSub}>PostGIS + Leaflet · Sprint S3</Text>
              </View>
            </View>

            {/* Radio */}
            <Text style={styles.sectionLabel}>RADIO DE BÚSQUEDA</Text>
            <View style={styles.radiiRow}>
              {RADII.map(r => (
                <TouchableOpacity key={r} onPress={() => setRadius(r)} style={[styles.radiusBtn, radius === r && styles.radiusBtnActive]}>
                  <Text style={[styles.radiusText, radius === r && styles.radiusTextActive]}>{r} km</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Filtros */}
            <View style={styles.filterRow}>
              {(["ALL", "OFFER", "REQUEST"] as const).map(f => (
                <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.filterBtnActive]}>
                  <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                    {f === "ALL" ? "Todos" : f === "OFFER" ? "Ofertas" : "Demandas"}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.count}>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            actionLabel="Solicitar match"
            onAction={() => alert(`Match solicitado con ${item.user.name}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Nada en {radius} km</Text>
            <Text style={styles.emptyText}>Prueba a ampliar el radio de búsqueda.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingTop: 52, paddingBottom: 24 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 2 },
  subtitle: { color: "#666", fontSize: 13, marginBottom: 16 },
  mapBox: { height: 200, backgroundColor: colors.d_background, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.l_background, overflow: "hidden", position: "relative" },
  mapPin: { position: "absolute", top: "40%", left: "45%", zIndex: 10 },
  mapPinEmoji: { fontSize: 32 },
  dot: { position: "absolute", width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.d_background },
  mapOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(22,27,42,0.7)", padding: 12 },
  mapLabel: { color: colors.primary, fontWeight: "700", fontSize: 13 },
  mapSub: { color: "#666", fontSize: 11 },
  sectionLabel: { color: "#555", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 },
  radiiRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  radiusBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: colors.d_background, borderWidth: 1, borderColor: colors.l_background },
  radiusBtnActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  radiusText: { color: "#888", fontSize: 13, fontWeight: "600" },
  radiusTextActive: { color: colors.background },
  filterRow: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.d_background, borderWidth: 1, borderColor: colors.l_background },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: "#888", fontSize: 12, fontWeight: "600" },
  filterTextActive: { color: "#fff" },
  count: { color: "#555", fontSize: 12, marginLeft: "auto" as any },
  empty: { alignItems: "center", paddingTop: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyTitle: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: 4 },
  emptyText: { color: "#666", fontSize: 13 },
});
