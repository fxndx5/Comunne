import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export default function ButtonGroup({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",     
    justifyContent: "center",  
    alignItems: "center",
    gap: 12,                  
    marginVertical: 10,
  },
});