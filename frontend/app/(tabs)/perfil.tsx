import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { currentUser } from "../../data/mockData";

const history = [
  { id: "t1", type: "earned", desc: "Clases de Python con Carlos López", min: 90, date: "05/03/2026", rating: 5 },
  { id: "t2", type: "spent", desc: "Masaje relajante con Sofía Ruiz", min: 45, date: "01/03/2026", rating: 5 },
  { id: "t3", type: "earned", desc: "Ayuda con JavaScript a Ana Martínez", min: 60, date: "22/02/2026", rating: 4 },
];

function Stars({ value }: { value: number }) {
  return <Text style={{ color: "#f59e0b", fontSize: 13 }}>{"★".repeat(value)}{"☆".repeat(5 - value)}</Text>;
}

export default function PerfilScreen() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [savedBio, setSavedBio] = useState(currentUser.bio);

  const save = () => { setSavedBio(bio); setEditing(false); };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mi perfil</Text>

      {/* Tarjeta principal */}
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentUser.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser.name}</Text>
            {editing ? (
              <View>
                <TextInput
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  style={styles.bioInput}
                  placeholderTextColor="#666"
                />
                <View style={styles.bioActions}>
                  <TouchableOpacity style={styles.saveBtn} onPress={save}>
                    <Text style={styles.saveBtnText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => { setBio(savedBio); setEditing(false); }}>
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.bioRow}>
                <Text style={styles.bio}>{savedBio}</Text>
                <TouchableOpacity onPress={() => setEditing(true)}>
                  <Text style={styles.editLink}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.stat, styles.statHighlight]}>
          <Text style={styles.statValue}>{currentUser.time_balance}</Text>
          <Text style={styles.statLabel}>Minutos disponibles</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentUser.reputation_as_provider.toFixed(1)}</Text>
          <Stars value={Math.round(currentUser.reputation_as_provider)} />
          <Text style={styles.statLabel}>Como proveedor</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentUser.reputation_as_requester.toFixed(1)}</Text>
          <Stars value={Math.round(currentUser.reputation_as_requester)} />
          <Text style={styles.statLabel}>Como solicitante</Text>
        </View>
      </View>

      {/* Info reputación */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoTitle}>⭐ Reputación dual</Text>
        <Text style={styles.infoText}>
          Comunne mantiene dos reputaciones separadas: como <Text style={{ color: colors.secondary }}>proveedor</Text> y como <Text style={{ color: colors.primary }}>solicitante</Text>. Se actualizan automáticamente al completar una transacción. (Sprint S6)
        </Text>
      </View>

      {/* Historial */}
      <Text style={styles.sectionLabel}>HISTORIAL DE INTERCAMBIOS</Text>
      {history.map((t) => (
        <View key={t.id} style={styles.historyItem}>
          <View style={[styles.historyIcon, t.type === "earned" ? styles.iconEarned : styles.iconSpent]}>
            <Text style={styles.historyIconText}>{t.type === "earned" ? "+" : "−"}</Text>
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyDesc}>{t.desc}</Text>
            <View style={styles.historyMeta}>
              <Stars value={t.rating} />
              <Text style={styles.historyDate}>{t.date}</Text>
            </View>
          </View>
          <Text style={[styles.historyMin, t.type === "earned" ? styles.minEarned : styles.minSpent]}>
            {t.type === "earned" ? "+" : "−"}{t.min} min
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingTop: 56, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 16 },
  card: { backgroundColor: colors.d_background, borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.l_background },
  profileRow: { flexDirection: "row", gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.secondary, fontWeight: "800", fontSize: 18 },
  profileInfo: { flex: 1 },
  name: { color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 4 },
  bioRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  bio: { color: "#aaa", fontSize: 13, flex: 1, lineHeight: 18 },
  editLink: { color: colors.secondary, fontSize: 12, fontWeight: "600" },
  bioInput: { backgroundColor: colors.l_background, borderRadius: 8, padding: 10, color: colors.text, fontSize: 13, marginBottom: 8, borderWidth: 1, borderColor: "#555" },
  bioActions: { flexDirection: "row", gap: 8 },
  saveBtn: { backgroundColor: colors.secondary, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  saveBtnText: { color: colors.background, fontWeight: "700", fontSize: 12 },
  cancelBtn: { borderWidth: 1, borderColor: colors.l_background, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  cancelBtnText: { color: "#aaa", fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  stat: { flex: 1, backgroundColor: colors.d_background, borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: colors.l_background },
  statHighlight: { borderColor: colors.secondary + "60", backgroundColor: colors.secondary + "10" },
  statValue: { color: colors.text, fontWeight: "800", fontSize: 20, marginBottom: 2 },
  statLabel: { color: "#888", fontSize: 10, textAlign: "center", marginTop: 2 },
  infoBanner: { backgroundColor: colors.primary + "15", borderWidth: 1, borderColor: colors.primary + "40", borderRadius: 12, padding: 14, marginBottom: 16 },
  infoTitle: { color: colors.primary, fontWeight: "700", fontSize: 13, marginBottom: 4 },
  infoText: { color: "#aaa", fontSize: 12, lineHeight: 18 },
  sectionLabel: { color: "#666", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 12 },
  historyItem: { flexDirection: "row", alignItems: "center", backgroundColor: colors.d_background, borderRadius: 12, padding: 14, marginBottom: 10, gap: 12, borderWidth: 1, borderColor: colors.l_background },
  historyIcon: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  iconEarned: { backgroundColor: colors.secondary + "25" },
  iconSpent: { backgroundColor: colors.error + "25" },
  historyIconText: { fontWeight: "800", fontSize: 16, color: colors.text },
  historyInfo: { flex: 1 },
  historyDesc: { color: colors.text, fontSize: 13, fontWeight: "600", marginBottom: 4 },
  historyMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  historyDate: { color: "#666", fontSize: 11 },
  historyMin: { fontWeight: "700", fontSize: 13 },
  minEarned: { color: colors.secondary },
  minSpent: { color: colors.error },
});
