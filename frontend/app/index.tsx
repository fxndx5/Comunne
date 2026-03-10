import { logStyle } from "@/styles/gloabalStyle";
import { View } from "react-native";
import { ModalProvider } from "../providers/ModalProvider";
import LogginPAge from "./screens/LogginPage";

export default function Index() {
  return (
    <ModalProvider>
      <View style={logStyle.page}>
        <LogginPAge />
      </View>
    </ModalProvider>
  );
}
