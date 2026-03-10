import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { posts as initialPosts, currentUser, Post } from "../../data/mockData";

function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const isOffer = post.service.type === "OFFER";

  const sendComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, {
      id: `nc_${Date.now()}`,
      user: currentUser,
      text: newComment.trim(),
      time: "ahora",
    }]);
    setNewComment("");
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.user.initials}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.time}>{post.time} · {post.user.distance_km} km</Text>
          </View>
        </View>
        <View style={[styles.badge, isOffer ? styles.badgeOffer : styles.badgeReq]}>
          <Text style={[styles.badgeText, isOffer ? styles.badgeTextOffer : styles.badgeTextReq]}>
            {isOffer ? "Ofrece" : "Busca"}
          </Text>
        </View>
      </View>

      {/* Service tag */}
      <View style={styles.serviceTag}>
        <Text style={styles.serviceTitle}>{post.service.title}</Text>
        <Text style={styles.serviceDuration}>⏱ {post.service.duration_minutes} min</Text>
      </View>

      {/* Caption */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Tags */}
      <View style={styles.tags}>
        {post.service.tags.map(t => (
          <View key={t} style={styles.tag}><Text style={styles.tagText}>#{t}</Text></View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => { setLiked(v => !v); setLikes(v => liked ? v - 1 : v + 1); }}>
          <Feather name="heart" size={16} color={liked ? "#e74c3c" : "#666"} />
          <Text style={[styles.actionText, liked && { color: "#e74c3c" }]}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setExpanded(v => !v)}>
          <Feather name="message-circle" size={16} color="#666" />
          <Text style={styles.actionText}>{comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="share-2" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.matchBtn]}>
          <Text style={styles.matchBtnText}>Solicitar match</Text>
        </TouchableOpacity>
      </View>

      {/* Comments */}
      {expanded && (
        <View style={styles.commentsArea}>
          {comments.map(c => (
            <View key={c.id} style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{c.user.initials}</Text>
              </View>
              <View style={styles.commentBubble}>
                <Text style={styles.commentUser}>{c.user.name} <Text style={styles.commentTime}>{c.time}</Text></Text>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
            </View>
          ))}
          <View style={styles.commentInput}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>{currentUser.initials}</Text>
            </View>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Escribe un comentario..."
              placeholderTextColor="#555"
              style={styles.commentField}
              onSubmitEditing={sendComment}
            />
            <TouchableOpacity onPress={sendComment}>
              <Feather name="send" size={16} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default function InicioScreen() {
  const [posts] = useState(initialPosts);

  return (
    <View style={styles.page}>
      <FlatList
        data={posts}
        keyExtractor={p => p.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Inicio</Text>
            <Text style={styles.subtitle}>Publicaciones recientes de tu comunidad</Text>
            {/* Live indicator */}
            <View style={styles.liveBar}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>En tiempo real · Supabase Realtime (Sprint S7)</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingTop: 52, paddingBottom: 24 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 2 },
  subtitle: { color: "#666", fontSize: 13, marginBottom: 12 },
  liveBar: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.secondary + "12", borderRadius: 8, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: colors.secondary + "30" },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.secondary },
  liveText: { color: colors.secondary, fontSize: 12, fontWeight: "500" },
  card: { backgroundColor: colors.d_background, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.l_background },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  avatarRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.secondary, fontWeight: "700", fontSize: 12 },
  userName: { color: colors.text, fontWeight: "600", fontSize: 13 },
  time: { color: "#555", fontSize: 11 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeOffer: { backgroundColor: colors.secondary + "20", borderWidth: 1, borderColor: colors.secondary },
  badgeReq: { backgroundColor: colors.primary + "20", borderWidth: 1, borderColor: colors.primary },
  badgeText: { fontSize: 11, fontWeight: "700" },
  badgeTextOffer: { color: colors.secondary },
  badgeTextReq: { color: colors.primary },
  serviceTag: { flexDirection: "row", justifyContent: "space-between", backgroundColor: colors.background, borderRadius: 8, padding: 10, marginBottom: 8 },
  serviceTitle: { color: colors.text, fontWeight: "600", fontSize: 13, flex: 1 },
  serviceDuration: { color: "#666", fontSize: 12 },
  caption: { color: "#bbb", fontSize: 14, lineHeight: 20, marginBottom: 10 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  tag: { backgroundColor: colors.l_background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tagText: { color: "#aaa", fontSize: 11 },
  actions: { flexDirection: "row", alignItems: "center", gap: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)", paddingTop: 10 },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  actionText: { color: "#666", fontSize: 13 },
  matchBtn: { marginLeft: "auto" as any, borderWidth: 1, borderColor: colors.secondary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  matchBtnText: { color: colors.secondary, fontSize: 12, fontWeight: "600" },
  commentsArea: { marginTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)", paddingTop: 12, gap: 8 },
  comment: { flexDirection: "row", gap: 8 },
  commentAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  commentAvatarText: { color: colors.secondary, fontSize: 10, fontWeight: "700" },
  commentBubble: { flex: 1, backgroundColor: colors.background, borderRadius: 10, padding: 8 },
  commentUser: { color: colors.text, fontSize: 12, fontWeight: "600", marginBottom: 2 },
  commentTime: { color: "#555", fontWeight: "400", fontSize: 11 },
  commentText: { color: "#aaa", fontSize: 13 },
  commentInput: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  commentField: { flex: 1, backgroundColor: colors.background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, fontSize: 13, borderWidth: 1, borderColor: colors.l_background },
});
