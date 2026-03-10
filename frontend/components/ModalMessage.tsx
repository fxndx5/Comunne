import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ModalType = "success" | "error" | "info";

export interface ModalMessageProps {
  visible: boolean;
  type?: ModalType;
  title?: string;
  message: string;
  onClose: () => void;
}

export function ModalMessage({
  visible,
  type = "info",
  title,
  message,
  onClose,
}: ModalMessageProps) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.modal, styles[type]]}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>



            {title ? <Text style={styles.title}>{title}</Text> : null}
            <Text style={styles.message}>{message}</Text>

          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  success: {
    backgroundColor: "#d4edda",
  },
  error: {
    backgroundColor: "#f8d7da",
  },
  info: {
    backgroundColor: "#d1ecf1",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#333",
  },
});

