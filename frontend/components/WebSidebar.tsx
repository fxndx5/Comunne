import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { currentUser } from "../data/mockData";

const NAV_ITEMS = [
  { route: "/(tabs)/inicio",   icon: "home",    label: "Inicio"    },
  { route: "/(tabs)/busqueda", icon: "search",  label: "Búsqueda"  },
  { route: "/(tabs)/mapa",     icon: "map-pin", label: "Mapa",      center: true },
  { route: "/(tabs)/chat",     icon: "message-circle", label: "Chat" },
  { route: "/(tabs)/perfil",   icon: "user",    label: "Perfil"    },
] as const;

export default function WebSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.sidebar as any}>
      {/* Logo */}
      <View style={styles.logoArea}>
        <Text style={styles.logoText}>Comunne</Text>
        <Text style={styles.logoSub}>Banco de tiempo</Text>
      </View>

      {/* Nav items */}
      <View style={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.includes(item.route.replace("/(tabs)", ""));
          const isCenter = "center" in item && item.center;
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route as any)}
              style={[
                styles.navItem,
                isActive && styles.navItemActive,
                isCenter && styles.navItemCenter,
              ]}
            >
              <View style={[styles.iconWrap, isCenter && styles.iconWrapCenter, isActive && !isCenter && styles.iconWrapActive]}>
                <Feather
                  name={item.icon as any}
                  size={isCenter ? 22 : 18}
                  color={isCenter ? colors.background : isActive ? colors.secondary : "#888"}
                />
              </View>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive, isCenter && styles.navLabelCenter]}>
                {item.label}
              </Text>
              {isCenter && <View style={styles.centerDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* User */}
      <View style={styles.userArea}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{currentUser.initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>{currentUser.name}</Text>
          <Text style={styles.userBalance}>{currentUser.time_balance} min disponibles</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    height: "100%",
    backgroundColor: "rgba(22, 27, 42, 0.82)",
    // @ts-ignore web-only
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.06)",
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexShrink: 0,
  },
  logoArea: {
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  logoText: {
    color: colors.secondary,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  logoSub: {
    color: "#555",
    fontSize: 11,
    marginTop: 2,
  },
  nav: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  navItemActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  navItemCenter: {
    marginVertical: 6,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(80, 227, 194, 0.12)",
  },
  iconWrapCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    // @ts-ignore web-only
    boxShadow: `0 0 16px ${colors.secondary}88`,
  },
  navLabel: {
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  navLabelActive: {
    color: colors.text,
    fontWeight: "600",
  },
  navLabelCenter: {
    color: colors.secondary,
    fontWeight: "700",
  },
  centerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginLeft: "auto",
  },
  userArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    marginTop: 16,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.l_background,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: colors.secondary,
    fontWeight: "700",
    fontSize: 12,
  },
  userInfo: { flex: 1 },
  userName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  userBalance: {
    color: colors.secondary,
    fontSize: 11,
    marginTop: 1,
  },
});
