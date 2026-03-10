import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Slot } from "expo-router";
import WebSidebar from "../../components/WebSidebar";
import MobileTabBar from "../../components/MobileTabBar";
import { ModalProvider } from "../../providers/ModalProvider";

function WebLayout() {
  return (
    <ModalProvider>
      <View style={{ flex: 1, flexDirection: "row", height: "100%" as any }}>
        <WebSidebar />
        <View style={{ flex: 1, overflow: "hidden" as any }}>
          <Slot />
        </View>
      </View>
    </ModalProvider>
  );
}

function MobileLayout() {
  return (
    <ModalProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <MobileTabBar {...props} />}
      >
        <Tabs.Screen name="inicio"   options={{ title: "Inicio" }} />
        <Tabs.Screen name="busqueda" options={{ title: "Búsqueda" }} />
        <Tabs.Screen name="mapa"     options={{ title: "Mapa" }} />
        <Tabs.Screen name="chat"     options={{ title: "Chat" }} />
        <Tabs.Screen name="perfil"   options={{ title: "Perfil" }} />
      </Tabs>
    </ModalProvider>
  );
}

export default function TabLayout() {
  if (Platform.OS === "web") return <WebLayout />;
  return <MobileLayout />;
}
