import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const ICONS: Record<string, string> = {
  inicio:   "home",
  busqueda: "search",
  mapa:     "map-pin",
  chat:     "message-circle",
  perfil:   "user",
};

export default function MobileTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const isCenter = route.name === "mapa";
        const icon = ICONS[route.name] ?? "circle";

        const onPress = () => {
          if (!isActive) navigation.navigate(route.name);
        };

        if (isCenter) {
          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.centerWrap}>
              <View style={styles.centerBtn}>
                <Feather name={icon as any} size={24} color={colors.background} />
              </View>
              <Text style={styles.centerLabel}>Mapa</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
            <Feather name={icon as any} size={20} color={isActive ? colors.secondary : "#555"} />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: "rgba(22, 27, 42, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    height: 64,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    color: "#555",
    fontSize: 10,
    fontWeight: "500",
  },
  labelActive: {
    color: colors.secondary,
  },
  centerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  centerBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: colors.secondary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  centerLabel: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: "700",
  },
});
