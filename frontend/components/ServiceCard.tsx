import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import type { Service } from "../data/mockData";

interface Props {
  service: Service;
  onAction?: () => void;
  actionLabel?: string;
}

export default function ServiceCard({ service, onAction, actionLabel }: Props) {
  const isOffer = service.type === "OFFER";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{service.user.initials}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{service.user.name}</Text>
            <Text style={styles.userMeta}>
              {service.user.distance_km} km · ⭐ {service.user.reputation_as_provider.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, isOffer ? styles.badgeOffer : styles.badgeRequest]}>
          <Text style={[styles.badgeText, isOffer ? styles.badgeTextOffer : styles.badgeTextRequest]}>
            {isOffer ? "Ofrece" : "Busca"}
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{service.description}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.tags}>
          {service.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.duration}>⏱ {service.duration_minutes} min</Text>
      </View>

      {onAction && (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
          <Text style={styles.actionBtnText}>{actionLabel ?? "Ver más"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.d_background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.l_background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.l_background,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.secondary,
    fontWeight: "700",
    fontSize: 12,
  },
  userName: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  userMeta: {
    color: "#999",
    fontSize: 11,
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeOffer: {
    backgroundColor: colors.secondary + "22",
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  badgeRequest: {
    backgroundColor: colors.primary + "22",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  badgeTextOffer: {
    color: colors.secondary,
  },
  badgeTextRequest: {
    color: colors.primary,
  },
  title: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  description: {
    color: "#aaa",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    flex: 1,
  },
  tag: {
    backgroundColor: colors.l_background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tagText: {
    color: "#ccc",
    fontSize: 11,
  },
  duration: {
    color: "#888",
    fontSize: 12,
    marginLeft: 8,
  },
  actionBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  actionBtnText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
  },
});
