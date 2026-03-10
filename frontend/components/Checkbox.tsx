import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

export default function Checkbox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {


    
  return (
    <TouchableOpacity style={styles.container} onPress={() => onChange(!value)}>
      <View style={[styles.box, value && styles.boxChecked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  boxChecked: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.text,
    fontSize: 16,
  },
});
