import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import type { Match } from "../data/mockData";

interface Props {
  match: Match;
}

const statusLabel: Record<Match["status"], string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptado",
  REJECTED: "Rechazado",
};

export default function MatchCard({ match }: Props) {
  const [status, setStatus] = useState<Match["status"]>(match.status);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const scorePercent = Math.round(match.score * 100);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { from: "Tú", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: match.offer.user.name, text: "¡Perfecto! ¿Cuándo te va bien?" }]);
    }, 700);
  };

  return (
    <View style={styles.card}>
      {/* Score + estado */}
      <View style={styles.topRow}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreDot} />
          <Text style={styles.scoreLabel}>Compatibilidad: {scorePercent}%</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreFill, { width: `${scorePercent}%` as any }]} />
          </View>
        </View>
        <View style={[styles.statusBadge,
          status === "ACCEPTED" ? styles.statusAccepted :
          status === "REJECTED" ? styles.statusRejected : styles.statusPending
        ]}>
          <Text style={styles.statusText}>{statusLabel[status]}</Text>
        </View>
      </View>

      {/* Servicios */}
      <View style={styles.servicesRow}>
        <View style={[styles.serviceBox, styles.offerBox]}>
          <Text style={styles.boxLabel}>Ofrece</Text>
          <View style={styles.miniAvatar}>
            <Text style={styles.miniAvatarText}>{match.offer.user.initials}</Text>
          </View>
          <Text style={styles.boxName}>{match.offer.user.name}</Text>
          <Text style={styles.boxTitle}>{match.offer.title}</Text>
          <Text style={styles.boxDuration}>⏱ {match.offer.duration_minutes} min</Text>
        </View>
        <View style={[styles.serviceBox, styles.requestBox]}>
          <Text style={[styles.boxLabel, styles.boxLabelRequest]}>Busca</Text>
          <View style={[styles.miniAvatar, styles.miniAvatarRequest]}>
            <Text style={styles.miniAvatarText}>{match.request.user.initials}</Text>
          </View>
          <Text style={styles.boxName}>{match.request.user.name}</Text>
          <Text style={styles.boxTitle}>{match.request.title}</Text>
          <Text style={styles.boxDuration}>⏱ {match.request.duration_minutes} min</Text>
        </View>
      </View>

      {/* Acciones */}
      {status === "PENDING" && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.acceptBtn} onPress={() => setStatus("ACCEPTED")}>
            <Text style={styles.acceptBtnText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn} onPress={() => setStatus("REJECTED")}>
            <Text style={styles.rejectBtnText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === "ACCEPTED" && (
        <View>
          <TouchableOpacity style={styles.chatToggle} onPress={() => setChatOpen((v) => !v)}>
            <Text style={styles.chatToggleText}>{chatOpen ? "Cerrar chat" : "💬 Abrir chat"}</Text>
          </TouchableOpacity>

          {chatOpen && (
            <View style={styles.chatContainer}>
              <View style={styles.chatMessages}>
                {messages.length === 0 && (
                  <Text style={styles.chatEmpty}>Empieza la conversación para coordinar el intercambio.</Text>
                )}
                {messages.map((m, i) => (
                  <View key={i} style={[styles.bubble, m.from === "Tú" ? styles.bubbleMine : styles.bubbleOther]}>
                    <Text style={[styles.bubbleText, m.from === "Tú" ? styles.bubbleTextMine : styles.bubbleTextOther]}>
                      {m.text}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.chatInput}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  placeholder="Escribe un mensaje..."
                  placeholderTextColor="#666"
                  style={styles.chatField}
                  onSubmitEditing={send}
                />
                <TouchableOpacity onPress={send} style={styles.sendBtn}>
                  <Text style={styles.sendBtnText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.d_background, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.l_background },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  scoreDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.secondary },
  scoreLabel: { color: "#aaa", fontSize: 12 },
  scoreBar: { width: 60, height: 4, backgroundColor: colors.l_background, borderRadius: 2, overflow: "hidden" },
  scoreFill: { height: "100%", backgroundColor: colors.secondary, borderRadius: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  statusPending: { backgroundColor: "#f59e0b22", borderWidth: 1, borderColor: "#f59e0b" },
  statusAccepted: { backgroundColor: colors.secondary + "22", borderWidth: 1, borderColor: colors.secondary },
  statusRejected: { backgroundColor: colors.error + "22", borderWidth: 1, borderColor: colors.error },
  statusText: { color: colors.text, fontSize: 11, fontWeight: "700" },
  servicesRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  serviceBox: { flex: 1, borderRadius: 10, padding: 10 },
  offerBox: { backgroundColor: colors.secondary + "15", borderWidth: 1, borderColor: colors.secondary + "40" },
  requestBox: { backgroundColor: colors.primary + "15", borderWidth: 1, borderColor: colors.primary + "40" },
  boxLabel: { color: colors.secondary, fontSize: 11, fontWeight: "700", marginBottom: 6 },
  boxLabelRequest: { color: colors.primary },
  miniAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.secondary + "40", alignItems: "center", justifyContent: "center", marginBottom: 4 },
  miniAvatarRequest: { backgroundColor: colors.primary + "40" },
  miniAvatarText: { color: colors.text, fontSize: 10, fontWeight: "700" },
  boxName: { color: "#aaa", fontSize: 11, marginBottom: 2 },
  boxTitle: { color: colors.text, fontSize: 12, fontWeight: "600", marginBottom: 2 },
  boxDuration: { color: "#888", fontSize: 11 },
  actions: { flexDirection: "row", gap: 8 },
  acceptBtn: { flex: 1, backgroundColor: colors.secondary, borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  acceptBtnText: { color: colors.background, fontWeight: "700", fontSize: 13 },
  rejectBtn: { flex: 1, borderWidth: 1, borderColor: colors.l_background, borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  rejectBtnText: { color: "#aaa", fontSize: 13 },
  chatToggle: { borderWidth: 1, borderColor: colors.primary, borderRadius: 10, paddingVertical: 8, alignItems: "center" },
  chatToggleText: { color: colors.primary, fontWeight: "600", fontSize: 13 },
  chatContainer: { marginTop: 10, borderWidth: 1, borderColor: colors.l_background, borderRadius: 10, overflow: "hidden" },
  chatMessages: { backgroundColor: colors.background, minHeight: 100, padding: 10, gap: 8 },
  chatEmpty: { color: "#666", fontSize: 12, textAlign: "center", marginTop: 20 },
  bubble: { maxWidth: "75%", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 14 },
  bubbleMine: { alignSelf: "flex-end", backgroundColor: colors.secondary },
  bubbleOther: { alignSelf: "flex-start", backgroundColor: colors.l_background },
  bubbleText: { fontSize: 13 },
  bubbleTextMine: { color: colors.background },
  bubbleTextOther: { color: colors.text },
  chatInput: { flexDirection: "row", borderTopWidth: 1, borderTopColor: colors.l_background },
  chatField: { flex: 1, color: colors.text, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 },
  sendBtn: { paddingHorizontal: 14, justifyContent: "center" },
  sendBtnText: { color: colors.secondary, fontWeight: "600", fontSize: 13 },
});
