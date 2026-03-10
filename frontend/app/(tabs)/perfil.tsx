import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { currentUser, myServicesWithReviews } from "../../data/mockData";

function Stars({ value }: { value: number }) {
  return <Text style={{ color: "#f59e0b", fontSize: 13 }}>{"★".repeat(value)}{"☆".repeat(5 - value)}</Text>;
}

function ServiceWithReviewsCard({ item }: { item: typeof myServicesWithReviews[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isOffer = item.service.type === "OFFER";
  const avgRating = item.reviews.length
    ? item.reviews.reduce((acc, r) => acc + r.rating, 0) / item.reviews.length
    : null;

  return (
    <View style={styles.serviceCard}>
      {/* Header del servicio */}
      <View style={styles.serviceHeader}>
        <View style={[styles.typeBadge, isOffer ? styles.typeBadgeOffer : styles.typeBadgeReq]}>
          <Text style={[styles.typeText, isOffer ? styles.typeTextOffer : styles.typeTextReq]}>
            {isOffer ? "Ofrece" : "Busca"}
          </Text>
        </View>
        <Text style={styles.serviceDuration}>⏱ {item.service.duration_minutes} min</Text>
      </View>
      <Text style={styles.serviceTitle}>{item.service.title}</Text>
      <Text style={styles.serviceDesc} numberOfLines={2}>{item.service.description}</Text>

      {/* Tags */}
      <View style={styles.tags}>
        {item.service.tags.map(t => (
          <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
        ))}
      </View>

      {/* Stats de reseñas */}
      <TouchableOpacity
        style={styles.reviewsToggle}
        onPress={() => setExpanded(v => !v)}
      >
        <View style={styles.reviewsStats}>
          {avgRating !== null ? (
            <>
              <Stars value={Math.round(avgRating)} />
              <Text style={styles.avgRating}>{avgRating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({item.reviews.length} reseña{item.reviews.length !== 1 ? "s" : ""})</Text>
            </>
          ) : (
            <Text style={styles.noReviews}>Sin reseñas aún</Text>
          )}
        </View>
        <Text style={styles.expandIcon}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* Reseñas expandidas */}
      {expanded && (
        <View style={styles.reviewsList}>
          {item.reviews.length === 0 ? (
            <Text style={styles.noReviewsText}>Nadie ha dejado una reseña todavía. Cuando completes intercambios, aparecerán aquí.</Text>
          ) : (
            item.reviews.map(r => (
              <View key={r.id} style={styles.review}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{r.user.initials}</Text>
                  </View>
                  <View style={styles.reviewMeta}>
                    <Text style={styles.reviewName}>{r.user.name}</Text>
                    <View style={styles.reviewRatingRow}>
                      <Stars value={r.rating} />
                      <Text style={styles.reviewDate}>{r.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

export default function PerfilScreen() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [savedBio, setSavedBio] = useState(currentUser.bio);

  const save = () => { setSavedBio(bio); setEditing(false); };

  return (
    <FlatList
      style={styles.page}
      contentContainerStyle={styles.content}
      data={myServicesWithReviews}
      keyExtractor={item => item.service.id}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Mi perfil</Text>

          {/* Tarjeta de usuario */}
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{currentUser.initials}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{currentUser.name}</Text>
                {editing ? (
                  <View>
                    <TextInput value={bio} onChangeText={setBio} multiline style={styles.bioInput} placeholderTextColor="#555" />
                    <View style={styles.bioActions}>
                      <TouchableOpacity style={styles.saveBtn} onPress={save}><Text style={styles.saveBtnText}>Guardar</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.cancelBtn} onPress={() => { setBio(savedBio); setEditing(false); }}><Text style={styles.cancelBtnText}>Cancelar</Text></TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.bioRow}>
                    <Text style={styles.bio}>{savedBio}</Text>
                    <TouchableOpacity onPress={() => setEditing(true)}><Text style={styles.editLink}>Editar</Text></TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.stat, styles.statHighlight]}>
              <Text style={styles.statValue}>{currentUser.time_balance}</Text>
              <Text style={styles.statLabel}>Min disponibles</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.reputation_as_provider.toFixed(1)}</Text>
              <Stars value={Math.round(currentUser.reputation_as_provider)} />
              <Text style={styles.statLabel}>Proveedor</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.reputation_as_requester.toFixed(1)}</Text>
              <Stars value={Math.round(currentUser.reputation_as_requester)} />
              <Text style={styles.statLabel}>Solicitante</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>MIS SERVICIOS Y RESEÑAS</Text>
        </View>
      }
      renderItem={({ item }) => <ServiceWithReviewsCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingTop: 52, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginBottom: 16 },
  card: { backgroundColor: colors.d_background, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.l_background },
  profileRow: { flexDirection: "row", gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center", flexShrink: 0 },
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
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  stat: { flex: 1, backgroundColor: colors.d_background, borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: colors.l_background, gap: 2 },
  statHighlight: { borderColor: colors.secondary + "60", backgroundColor: colors.secondary + "10" },
  statValue: { color: colors.text, fontWeight: "800", fontSize: 20 },
  statLabel: { color: "#777", fontSize: 10, textAlign: "center" },
  sectionLabel: { color: "#555", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 12 },
  // Service cards
  serviceCard: { backgroundColor: colors.d_background, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.l_background },
  serviceHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  typeBadgeOffer: { backgroundColor: colors.secondary + "20", borderWidth: 1, borderColor: colors.secondary },
  typeBadgeReq: { backgroundColor: colors.primary + "20", borderWidth: 1, borderColor: colors.primary },
  typeText: { fontSize: 11, fontWeight: "700" },
  typeTextOffer: { color: colors.secondary },
  typeTextReq: { color: colors.primary },
  serviceDuration: { color: "#666", fontSize: 12 },
  serviceTitle: { color: colors.text, fontWeight: "700", fontSize: 15, marginBottom: 4 },
  serviceDesc: { color: "#aaa", fontSize: 13, lineHeight: 18, marginBottom: 8 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  tag: { backgroundColor: colors.l_background, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  tagText: { color: "#ccc", fontSize: 11 },
  reviewsToggle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)", paddingTop: 10 },
  reviewsStats: { flexDirection: "row", alignItems: "center", gap: 6 },
  avgRating: { color: colors.text, fontWeight: "700", fontSize: 14 },
  reviewCount: { color: "#666", fontSize: 12 },
  noReviews: { color: "#555", fontSize: 12 },
  expandIcon: { color: "#555", fontSize: 12 },
  reviewsList: { marginTop: 12, gap: 10 },
  noReviewsText: { color: "#555", fontSize: 13, lineHeight: 18, fontStyle: "italic" },
  review: { backgroundColor: colors.background, borderRadius: 10, padding: 12 },
  reviewHeader: { flexDirection: "row", gap: 10, marginBottom: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.l_background, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  reviewAvatarText: { color: colors.secondary, fontWeight: "700", fontSize: 11 },
  reviewMeta: { flex: 1 },
  reviewName: { color: colors.text, fontWeight: "600", fontSize: 13, marginBottom: 2 },
  reviewRatingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  reviewDate: { color: "#555", fontSize: 11 },
  reviewComment: { color: "#bbb", fontSize: 13, lineHeight: 18 },
});
