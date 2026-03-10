import { FlatList, StyleSheet, Text, View } from "react-native";
import MatchCard from "../../components/MatchCard";
import { colors } from "../../constants/colors";
import { matches } from "../../data/mockData";

export default function MatchesScreen() {
  const pending = matches.filter((m) => m.status === "PENDING");
  const accepted = matches.filter((m) => m.status === "ACCEPTED");

  return (
    <View style={styles.page}>
      <FlatList
        data={[...pending, ...accepted]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Mis matches</Text>
            <Text style={styles.subtitle}>Conexiones generadas por el motor de matching semántico</Text>

            {/* Info banner */}
            <View style={styles.infoBanner}>
              <Text style={styles.infoTitle}>⚙️ Cómo funciona el matching</Text>
              <Text style={styles.infoText}>
                El motor TF-IDF analiza tus servicios y los compara con usuarios cercanos.
                El score refleja la compatibilidad. En Sprint S5 se añaden embeddings semánticos.
              </Text>
            </View>

            {pending.length > 0 && (
              <Text style={styles.sectionLabel}>PENDIENTES ({pending.length})</Text>
            )}
          </View>
        }
        renderItem={({ item, index }) => {
          const isFirstAccepted = index === pending.length && accepted.length > 0;
          return (
            <View>
              {isFirstAccepted && (
                <Text style={[styles.sectionLabel, { marginTop: 8 }]}>
                  ACEPTADOS — EN CURSO ({accepted.length})
                </Text>
              )}
              <MatchCard match={item} />
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🤝</Text>
            <Text style={styles.emptyTitle}>Aún no tienes matches</Text>
            <Text style={styles.emptyText}>Crea un servicio y el sistema buscará conexiones en tu comunidad.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingTop: 56 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 4 },
  subtitle: { color: "#888", fontSize: 13, marginBottom: 16 },
  infoBanner: { backgroundColor: colors.primary + "18", borderWidth: 1, borderColor: colors.primary + "50", borderRadius: 12, padding: 14, marginBottom: 16 },
  infoTitle: { color: colors.primary, fontWeight: "700", fontSize: 13, marginBottom: 4 },
  infoText: { color: "#aaa", fontSize: 12, lineHeight: 18 },
  sectionLabel: { color: "#666", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 10 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyText: { color: "#888", fontSize: 13, textAlign: "center", paddingHorizontal: 20 },
});
