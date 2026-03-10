import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MatchCard from "../../components/MatchCard";
import { colors } from "../../constants/colors";
import { matches, notifications } from "../../data/mockData";

type Tab = "matches" | "notificaciones";

export default function BusquedaScreen() {
  const [tab, setTab] = useState<Tab>("matches");
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Búsqueda</Text>
        <Text style={styles.subtitle}>Matches y notificaciones</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tabBtn, tab === "matches" && styles.tabBtnActive]} onPress={() => setTab("matches")}>
          <Text style={[styles.tabText, tab === "matches" && styles.tabTextActive]}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, tab === "notificaciones" && styles.tabBtnActive]} onPress={() => setTab("notificaciones")}>
          <Text style={[styles.tabText, tab === "notificaciones" && styles.tabTextActive]}>
            Notificaciones {unreadCount > 0 && <Text style={styles.badge}> {unreadCount}</Text>}
          </Text>
        </TouchableOpacity>
      </View>

      {tab === "matches" ? (
        <FlatList
          data={matches}
          keyExtractor={m => m.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.infoBanner}>
              <Text style={styles.infoTitle}>⚙️ Motor de matching semántico</Text>
              <Text style={styles.infoText}>TF-IDF analiza tus servicios y los compara con usuarios cercanos. Sprint S5 añade embeddings semánticos.</Text>
            </View>
          }
          renderItem={({ item }) => <MatchCard match={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🤝</Text>
              <Text style={styles.emptyTitle}>Sin matches aún</Text>
              <Text style={styles.emptyText}>Publica un servicio para que el sistema genere conexiones.</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={notifs}
          keyExtractor={n => n.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.notif, !item.read && styles.notifUnread]}
              onPress={() => setNotifs(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n))}
            >
              <View style={[styles.notifDot, item.read && styles.notifDotRead]} />
              <View style={styles.notifContent}>
                <Text style={[styles.notifText, !item.read && styles.notifTextUnread]}>{item.text}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 2 },
  subtitle: { color: "#666", fontSize: 13 },
  tabs: { flexDirection: "row", marginHorizontal: 16, marginBottom: 8, backgroundColor: colors.d_background, borderRadius: 10, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 },
  tabBtnActive: { backgroundColor: colors.l_background },
  tabText: { color: "#666", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: colors.text },
  badge: { color: colors.secondary, fontWeight: "800" },
  list: { padding: 16, paddingTop: 8, paddingBottom: 24 },
  infoBanner: { backgroundColor: colors.primary + "18", borderWidth: 1, borderColor: colors.primary + "50", borderRadius: 12, padding: 12, marginBottom: 14 },
  infoTitle: { color: colors.primary, fontWeight: "700", fontSize: 13, marginBottom: 4 },
  infoText: { color: "#aaa", fontSize: 12, lineHeight: 18 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyText: { color: "#888", fontSize: 13, textAlign: "center", paddingHorizontal: 20 },
  notif: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14, borderRadius: 12, marginBottom: 8, backgroundColor: colors.d_background, borderWidth: 1, borderColor: colors.l_background },
  notifUnread: { borderColor: colors.secondary + "50", backgroundColor: colors.secondary + "08" },
  notifDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#555", marginTop: 4, flexShrink: 0 },
  notifDotRead: { backgroundColor: "transparent" },
  notifContent: { flex: 1 },
  notifText: { color: "#999", fontSize: 13, lineHeight: 18 },
  notifTextUnread: { color: colors.text, fontWeight: "600" },
  notifTime: { color: "#555", fontSize: 11, marginTop: 3 },
});
