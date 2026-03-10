import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

export default function Select({ label, options, value, onChange, }: { label: string; options: string[]; value: string; onChange: (v: string) => void; }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.form}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.value}>{value || "Selecciona..."}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.l_background,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  value: {
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#0006",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: colors.l_background,
    borderRadius: 12,
    padding: 10,
  },
  option: {
    padding: 12,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
  },
});
