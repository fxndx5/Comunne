import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { conversations, currentUser } from "../../data/mockData";
import type { Conversation } from "../../data/mockData";

type Message = { id: string; from: "me" | "them"; text: string; time: string };

const mockMessages: Record<string, Message[]> = {
  cv1: [
    { id: "1", from: "them", text: "Hola! Vi que ofreces clases de Python, me interesa mucho", time: "10:30" },
    { id: "2", from: "me",   text: "¡Claro! ¿Qué nivel tienes ahora mismo?", time: "10:32" },
    { id: "3", from: "them", text: "Tengo algo de base en JS pero Python lo tengo a cero", time: "10:33" },
    { id: "4", from: "me",   text: "Perfecto, empezamos desde cero sin problema", time: "10:35" },
    { id: "5", from: "them", text: "¡Perfecto! ¿Quedamos el sábado?", time: "10:36" },
  ],
  cv2: [
    { id: "1", from: "them", text: "Hola, me has salido como match para clases de diseño", time: "ayer" },
    { id: "2", from: "me",   text: "¡Genial! ¿Tienes Figma instalado ya?", time: "ayer" },
    { id: "3", from: "them", text: "Genial, cuando quieras empezamos", time: "ayer" },
  ],
};

function ChatScreen({ conv, onBack }: { conv: Conversation; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages[conv.id] ?? []);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), from: "me", text: input.trim(), time: "ahora" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { id: String(Date.now() + 1), from: "them", text: "👍 Perfecto, nos vemos entonces", time: "ahora" }]);
    }, 900);
  };

  return (
    <View style={styles.chatPage}>
      {/* Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.chatAvatar}>
          <Text style={styles.chatAvatarText}>{conv.participant.initials}</Text>
        </View>
        <View>
          <Text style={styles.chatName}>{conv.participant.name}</Text>
          <Text style={styles.chatStatus}>⭐ {conv.participant.reputation_as_provider.toFixed(1)} · {conv.participant.distance_km} km</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={m => m.id}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.from === "me" ? styles.bubbleMe : styles.bubbleThem]}>
            <Text style={[styles.bubbleText, item.from === "me" && styles.bubbleTextMe]}>{item.text}</Text>
            <Text style={[styles.bubbleTime, item.from === "me" && styles.bubbleTimeMe]}>{item.time}</Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#555"
          style={styles.inputField}
          onSubmitEditing={send}
        />
        <TouchableOpacity onPress={send} style={styles.sendBtn}>
          <Text style={styles.sendText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ChatListScreen() {
  const [convs] = useState(conversations);
  const [active, setActive] = useState<Conversation | null>(null);

  if (active) return <ChatScreen conv={active} onBack={() => setActive(null)} />;

  return (
    <View style={styles.page}>
      <FlatList
        data={convs}
        keyExtractor={c => c.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Chat</Text>
            <Text style={styles.subtitle}>Conversaciones de tus matches aceptados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.convItem} onPress={() => setActive(item)}>
            <View style={[styles.convAvatar, item.unread > 0 && styles.convAvatarUnread]}>
              <Text style={styles.convAvatarText}>{item.participant.initials}</Text>
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convRow}>
                <Text style={styles.convName}>{item.participant.name}</Text>
                <Text style={styles.convTime}>{item.time}</Text>
              </View>
              <Text style={[styles.convLast, item.unread > 0 && styles.convLastUnread]} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>Sin conversaciones</Text>
            <Text style={styles.emptyText}>Acepta un match para empezar a chatear.</Text>
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
  convItem: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, backgroundColor: colors.d_background, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.l_background },
  convAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  convAvatarUnread: { borderWidth: 2, borderColor: colors.secondary },
  convAvatarText: { color: colors.secondary, fontWeight: "700", fontSize: 14 },
  convInfo: { flex: 1 },
  convRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  convName: { color: colors.text, fontWeight: "600", fontSize: 14 },
  convTime: { color: "#555", fontSize: 11 },
  convLast: { color: "#666", fontSize: 13 },
  convLastUnread: { color: "#aaa", fontWeight: "600" },
  unreadBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.secondary, alignItems: "center", justifyContent: "center" },
  unreadText: { color: colors.background, fontSize: 11, fontWeight: "800" },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyText: { color: "#888", fontSize: 13, textAlign: "center" },
  // Chat screen
  chatPage: { flex: 1, backgroundColor: colors.background },
  chatHeader: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, paddingTop: 52, borderBottomWidth: 1, borderBottomColor: colors.l_background },
  backBtn: { padding: 4 },
  backText: { color: colors.secondary, fontSize: 22, fontWeight: "700" },
  chatAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center" },
  chatAvatarText: { color: colors.secondary, fontWeight: "700", fontSize: 13 },
  chatName: { color: colors.text, fontWeight: "700", fontSize: 15 },
  chatStatus: { color: "#666", fontSize: 11 },
  messages: { padding: 16, gap: 8 },
  bubble: { maxWidth: "75%" as any, borderRadius: 14, padding: 10 },
  bubbleMe: { alignSelf: "flex-end", backgroundColor: colors.secondary },
  bubbleThem: { alignSelf: "flex-start", backgroundColor: colors.d_background, borderWidth: 1, borderColor: colors.l_background },
  bubbleText: { color: colors.text, fontSize: 14 },
  bubbleTextMe: { color: colors.background },
  bubbleTime: { color: "#aaa", fontSize: 10, marginTop: 3 },
  bubbleTimeMe: { color: colors.background + "aa" },
  inputRow: { flexDirection: "row", gap: 8, padding: 12, borderTopWidth: 1, borderTopColor: colors.l_background },
  inputField: { flex: 1, backgroundColor: colors.d_background, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, color: colors.text, fontSize: 14, borderWidth: 1, borderColor: colors.l_background },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.secondary, alignItems: "center", justifyContent: "center" },
  sendText: { color: colors.background, fontSize: 20, fontWeight: "700" },
});
